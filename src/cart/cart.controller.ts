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
import { CartService } from './cart.service';
import { CreateCartDto, UpdateCartDto } from './dto';

@UseGuards(JwtTokenGuard)
@Controller('carts')
export class CartController {
  constructor(private cartServices: CartService) {}

  // Get Cart items
  @Get('')
  async getCartItems(@GetUser('id') userId: string, @Query() query: any) {
    return await this.cartServices.getCartItems(userId, query);
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
  async createCart(@GetUser('id') userId: string, @Body() body: CreateCartDto) {
    return await this.cartServices.createCart(userId, body);
  }

  // Update cart Items
  @Put(':id')
  async updateCart(
    @GetUser('id') userId: string,
    @Param('id') cartId: string,
    @Body() body: UpdateCartDto,
  ) {
    return await this.cartServices.updateCart(userId, cartId, body);
  }

  // Delete Cart Items
  @Delete(':id')
  async deleteCart(@GetUser('id') userId: string, @Param('id') cartId: string) {
    return await this.cartServices.deleteCart(userId, cartId);
  }
}
