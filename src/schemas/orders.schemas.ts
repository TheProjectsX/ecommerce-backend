import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// Define a sub-document schema for each product in the order
class ProductDetails {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Product' })
  product: Types.ObjectId;

  @Prop({ type: Number, required: true })
  quantity: number;
}

// Schema Class
@Schema({ timestamps: true })
export class Orders {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Users' })
  userId: Types.ObjectId;

  @Prop({ type: [ProductDetails], required: true })
  products: ProductDetails[];

  @Prop({
    required: true,
    enum: ['pending', 'completed', 'canceled'],
    default: 'pending',
  })
  status: string;

  @Prop({ required: true })
  quantities: number[];

  @Prop({ required: true })
  totalAmount: number;

  @Prop({ required: true })
  orderDate: Date;
}
