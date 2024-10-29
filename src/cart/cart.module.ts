import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Carts', schema: CartsSchema }]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
