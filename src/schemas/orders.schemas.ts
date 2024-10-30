import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// Define a sub-document schema for each product in the order
@Schema()
class ProductDetails {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Products' })
  product: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;
}

export const ProductDetailsSchema =
  SchemaFactory.createForClass(ProductDetails);

// Schema Class
@Schema({ timestamps: true })
export class Orders {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Users' })
  userId: Types.ObjectId;

  @Prop({ type: [ProductDetailsSchema], required: true })
  orders: ProductDetails[];

  @Prop({
    required: true,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  })
  status: string;

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true, default: Date.now })
  orderDate: Date;
}

export const OrdersSchema = SchemaFactory.createForClass(Orders);
