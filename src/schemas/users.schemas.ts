import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

// Schema Class
@Schema({ timestamps: true })
export class Users {
  @Prop({ required: true, trim: true, minlength: 2 })
  username: string;

  @Prop({ trim: true })
  profilePicture: string;

  @Prop({
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['user', 'admin'], default: 'user' })
  role: string;

  @Prop({ default: true })
  active: boolean;

  address: {
    street: { type: String; trim: true };
    city: { type: String; trim: true };
    state: { type: String; trim: true };
    postalCode: { type: String; trim: true };
    country: { type: String; trim: true };
  };

  @Prop({ required: true, trim: true })
  phone: string;

  @Prop({ default: false })
  isVerified: boolean;
}

// Schema
export const UsersSchema = SchemaFactory.createForClass(Users);
