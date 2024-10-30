import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Carts } from 'src/schemas';
import { CreateCartDto, UpdateCartDto } from './dto';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Carts.name) private cartsModel: mongoose.Model<Carts>,
  ) {}

  // Get Cart items
  async getCartItems(
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
    data: Carts[];
  }> {
    const { limit = 10, page = 1 } = query;
    const skip = (page - 1) * limit;

    const filter = { userId };

    const cartsData = await this.cartsModel
      .find(filter)
      .limit(limit)
      .skip(skip)
      .populate('product', 'name price images')
      .exec();
    const totalCartsCount = await this.cartsModel.countDocuments(filter);

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

  // Get Single Cart
  async getSingleCart(userId: string, cartId: string) {
    try {
      const dbResponse = await this.cartsModel
        .findOne({
          userId: userId,
          _id: cartId,
        })
        .populate('product');
      if (!dbResponse) {
        throw new NotFoundException('Item not Found!');
      }

      return { success: true, ...dbResponse.toJSON() };
    } catch (error) {
      if (error instanceof mongoose.Error.CastError && error.path === '_id') {
        throw new BadRequestException('Invalid Item ID given');
      }

      throw error;
    }
  }

  // Create new Cart
  async createCart(userId: string, body: CreateCartDto) {
    body['userId'] = userId;
    const dbResponse = await this.cartsModel.create(body);
    return { success: true, ...dbResponse.toJSON() };
  }

  // Update cart Items
  async updateCart(userId: string, cartId: string, body: UpdateCartDto) {
    const dbResponse = await this.cartsModel.updateOne(
      { userId: userId, _id: cartId },
      { ...body },
    );

    if (dbResponse.matchedCount === 0) {
      throw new NotFoundException('Item not Found');
    }

    return { success: true, ...dbResponse };
  }

  // Delete Cart Items
  async deleteCart(userId: string, cartId: string) {
    const dbResponse = await this.cartsModel.deleteOne({
      userId: userId,
      _id: cartId,
    });

    if (dbResponse.deletedCount === 0) {
      throw new NotFoundException('Item not Found!');
    }

    return { success: true, ...dbResponse };
  }
}
