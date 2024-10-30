import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
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
  @HttpCode(HttpStatus.OK)
  async getCartItems(@GetUser('id') userId: string, @Query() query: any) {
    return await this.cartsServices.getCartItems(userId, query);
  }

  // Get Single Cart
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSingleCart(
    @GetUser('id') userId: string,
    @Param('id') cartId: string,
  ) {
    return await this.cartsServices.getSingleCart(userId, cartId);
  }

  // Create new Cart
  @Post()
  @HttpCode(HttpStatus.OK)
  async createCart(@GetUser('id') userId: string, @Body() body: CreateCartDto) {
    return await this.cartsServices.createCart(userId, body);
  }

  // Update cart Items
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateCart(
    @GetUser('id') userId: string,
    @Param('id') cartId: string,
    @Body() body: UpdateCartDto,
  ) {
    return await this.cartsServices.updateCart(userId, cartId, body);
  }

  // Delete Cart Items
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteCart(@GetUser('id') userId: string, @Param('id') cartId: string) {
    return await this.cartsServices.deleteCart(userId, cartId);
  }
}
