import { Module } from '@nestjs/common';
import { CartsController } from './carts.controller';
import { CartsService } from './carts.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CartsSchema } from 'src/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Carts', schema: CartsSchema }]),
  ],
  controllers: [CartsController],
  providers: [CartsService],
})
export class CartsModule {}
