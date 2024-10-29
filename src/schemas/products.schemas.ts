import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Schema Class
@Schema({ timestamps: true })
export class Products {
  @Prop({ required: true, trim: true, minlength: 2 })
  name: string;

  @Prop({ required: true, trim: true, minlength: 10 })
  description: string;

  @Prop({ required: true, min: 0 })
  price: number;

  @Prop({ required: true })
  category: string;

  @Prop({ default: [''] })
  images: [
    {
      type: string;
    },
  ];

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

// Product Schema
export const ProductsSchema = SchemaFactory.createForClass(Products);
