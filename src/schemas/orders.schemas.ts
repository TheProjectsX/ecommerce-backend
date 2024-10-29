import { Prop, Schema } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// Schema Class
@Schema({ timestamps: true })
export class Orders {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Users' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Products' })
  productIds: Types.ObjectId[];

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
