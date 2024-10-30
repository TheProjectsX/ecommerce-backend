import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Orders } from 'src/schemas';
import { CreateOrderDto } from './dto';
import { UpdateOrderDto } from './dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Orders.name) private ordersModel: mongoose.Model<Orders>,
  ) {}

  // Get Order items
  async getOrderItems(
    userId: string,
    query: any,
  ): Promise<{
    success: boolean;
    pagination: {
      currentCount: number;
      total: number;
      has_next_page: boolean;
      nextPage: number;
    };
    data: Orders[];
  }> {
    const { limit = 10, page = 1 } = query;
    const skip = (page - 1) * limit;

    const filter = { userId };

    const cartsData = await this.ordersModel
      .find(filter)
      .limit(limit)
      .skip(skip)
      .populate('orders.product', 'name price images')
      .exec();
    const totalCartsCount = await this.ordersModel.countDocuments(filter);

    const pagination = {
      currentCount: limit,
      total: totalCartsCount,
      has_next_page: page * limit < totalCartsCount,
      nextPage: page + 1,
    };

    const returnData = {
      success: true,
      pagination,
      data: cartsData,
    };

    return returnData;
  }

  // Get Single Order
  async getSingleOrder(userId: string, orderId: string) {
    try {
      const dbResponse = await this.ordersModel
        .findOne({
          userId: userId,
          _id: orderId,
        })
        .populate('orders.product');
      if (!dbResponse) {
        throw new NotFoundException('Order not Found!');
      }

      return { success: true, ...dbResponse.toJSON() };
    } catch (error) {
      if (error instanceof mongoose.Error.CastError && error.path === '_id') {
        throw new BadRequestException('Invalid Order ID given');
      }

      throw error;
    }
  }

  // Create new Order
  async createOrder(userId: string, body: CreateOrderDto) {
    body['userId'] = userId;
    const dbResponse = await this.ordersModel.create(body);
    return { success: true, ...dbResponse.toJSON() };
  }

  // Update Order Items
  async updateOrder(userId: string, orderId: string, body: UpdateOrderDto) {
    const dbResponse = await this.ordersModel.updateOne(
      { userId: userId, _id: orderId },
      { ...body },
    );

    if (dbResponse.matchedCount === 0) {
      throw new NotFoundException('Order not Found');
    }

    return { success: true, ...dbResponse };
  }

  // Delete Order Items
  async deleteOrder(userId: string, orderId: string) {
    const dbResponse = await this.ordersModel.deleteOne({
      userId: userId,
      _id: orderId,
    });

    if (dbResponse.deletedCount === 0) {
      throw new NotFoundException('Order not Found!');
    }

    return { success: true, ...dbResponse };
  }
}
