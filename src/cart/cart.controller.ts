import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { JwtTokenGuard } from 'src/guard';
import { CartService } from './cart.service';

@UseGuards(JwtTokenGuard)
@Controller('carts')
export class CartController {
  constructor(private cartServices: CartService) {}

  // Get Cart items
  @Get('')
  async getCartItems(@GetUser('id') userId: string) {
    return await this.cartServices.getCartItems(userId);
  }

  // Get Single Cart
  @Get(':id')
  async getSingleCart(
    @GetUser('id') userId: string,
    @Param('id') cartId: string,
  ) {
    return await this.cartServices.getSingleCart(userId, cartId);
  }

  // Create new Cart
  @Post()
  async createCart(@GetUser('id') userId: string, @Body() body: any) {
    return await this.cartServices.createCart(userId, body);
  }

  // Update cart Items
  @Put(':id')
  async updateCart(@GetUser('id') userId: string, @Body() body: any) {
    return await this.cartServices.updateCart(userId, body);
  }

  // Delete Cart Items
  @Delete(':id')
  async deleteCart(@GetUser('id') userId: string, @Param('id') cartId: string) {
    return await this.cartServices.deleteCart(userId, cartId);
  }
}
