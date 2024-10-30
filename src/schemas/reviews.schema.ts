import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

// Schema Class
@Schema({ timestamps: true })
export class Reviews {
  @Prop({ type: Types.ObjectId, required: true, ref: 'Users' })
  userId: Types.ObjectId;

  @Prop({ type: Types.ObjectId, required: true, ref: 'Products' })
  productId: Types.ObjectId;

  @Prop({ required: true, min: 1, max: 5 })
  rating: number;

  @Prop({ maxlength: 500 })
  review: string;

  @Prop({ default: [] })
  likedBy: Types.ObjectId[];
}

export const ReviewsSchema = SchemaFactory.createForClass(Reviews);
