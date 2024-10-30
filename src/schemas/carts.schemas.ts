import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// Schema Class
@Schema({ timestamps: true })
export class Carts {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Users' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Products' })
  product: Types.ObjectId;

  @Prop({ required: true, min: 1 })
  quantity: number;
}

// Carts Schema
export const CartsSchema = SchemaFactory.createForClass(Carts);
