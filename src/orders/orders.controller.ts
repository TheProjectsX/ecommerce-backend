import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { JwtTokenGuard } from 'src/guard';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto';
import { UpdateOrderDto } from './dto';

@UseGuards(JwtTokenGuard)
@Controller('orders')
export class OrdersController {
  constructor(private ordersServices: OrdersService) {}

  // Get Cart items
  @Get('')
  async getOrderItems(@GetUser('id') userId: string, @Query() query: any) {
    return await this.ordersServices.getOrderItems(userId, query);
  }

  // Get Single Cart
  @Get(':id')
  async getSingleOrder(
    @GetUser('id') userId: string,
    @Param('id') orderId: string,
  ) {
    return await this.ordersServices.getSingleOrder(userId, orderId);
  }

  // Create new Cart
  @Post()
  async createOrder(
    @GetUser('id') userId: string,
    @Body() body: CreateOrderDto,
  ) {
    return await this.ordersServices.createOrder(userId, body);
  }

  // Update cart Items
  @Put(':id')
  async updateOrder(
    @GetUser('id') userId: string,
    @Param('id') orderId: string,
    @Body() body: UpdateOrderDto,
  ) {
    return await this.ordersServices.updateOrder(userId, orderId, body);
  }

  // Delete Cart Items
  @Delete(':id')
  async deleteOrder(
    @GetUser('id') userId: string,
    @Param('id') orderId: string,
  ) {
    return await this.ordersServices.deleteOrder(userId, orderId);
  }
}
