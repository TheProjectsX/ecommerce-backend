import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Carts } from 'src/schemas';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Carts.name) private cartsModel: mongoose.Model<Carts>,
  ) {}

  // Get Cart items
  async getCartItems(userId: string) {
    return {};
  }

  // Get Single Cart
  async getSingleCart(userId: string, cartId: string) {
    return;
  }

  // Create new Cart
  async createCart(userId: string, body: any) {
    return {};
  }

  // Update cart Items
  async updateCart(userId: string, body: any) {
    return {};
  }

  // Delete Cart Items
  async deleteCart(userId: string, cartId: string) {
    return {};
  }
}
