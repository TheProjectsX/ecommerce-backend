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
import { CartsService } from './carts.service';
import { CreateCartDto, UpdateCartDto } from './dto';

@UseGuards(JwtTokenGuard)
@Controller('carts')
export class CartsController {
  constructor(private cartsServices: CartsService) {}

  // Get Cart items
  @Get('')
  async getCartItems(@GetUser('id') userId: string, @Query() query: any) {
    return await this.cartsServices.getCartItems(userId, query);
  }

  // Get Single Cart
  @Get(':id')
  async getSingleCart(
    @GetUser('id') userId: string,
    @Param('id') cartId: string,
  ) {
    return await this.cartsServices.getSingleCart(userId, cartId);
  }

  // Create new Cart
  @Post()
  async createCart(@GetUser('id') userId: string, @Body() body: CreateCartDto) {
    return await this.cartsServices.createCart(userId, body);
  }

  // Update cart Items
  @Put(':id')
  async updateCart(
    @GetUser('id') userId: string,
    @Param('id') cartId: string,
    @Body() body: UpdateCartDto,
  ) {
    return await this.cartsServices.updateCart(userId, cartId, body);
  }

  // Delete Cart Items
  @Delete(':id')
  async deleteCart(@GetUser('id') userId: string, @Param('id') cartId: string) {
    return await this.cartsServices.deleteCart(userId, cartId);
  }
}
