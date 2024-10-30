import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Products } from 'src/schemas';
import { CreateProductDto, UpdateProductDto } from './dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Products.name) private productsModel: mongoose.Model<Products>,
  ) {}

  // Get Products
  async getProducts(query: any): Promise<{
    success: boolean;
    pagination: {
      currentCount: number;
      total: number;
      has_next_page: boolean;
      nextPage: number;
    };
    data: Products[];
  }> {
    const { category, minPrice, maxPrice, limit = 10, page = 1 } = query;
    const skip = (page - 1) * limit;

    const filter: any = {};
    if (category) {
      filter.category = category;
    }

    if (minPrice) {
      filter.price = { $gte: minPrice };
    }
    if (maxPrice) {
      filter.price = { ...filter.price, $lte: maxPrice };
    }

    const productsData = await this.productsModel
      .find(filter)
      .limit(limit)
      .skip(skip)
      .exec();
    const totalProductsCount = await this.productsModel.countDocuments(filter);

    const pagination = {
      currentCount: limit,
      total: totalProductsCount,
      has_next_page: page * limit < totalProductsCount,
      nextPage: page + 1,
    };

    const returnData = {
      success: true,
      pagination,
      data: productsData,
    };

    return returnData;
  }

  // Get single Product
  async getSingleProduct(productId: string): Promise<{}> {
    try {
      const dbResponse = await this.productsModel.findById(productId);
      if (!dbResponse) {
        throw new NotFoundException('Product not Found!');
      }

      return { success: true, ...dbResponse.toJSON() };
    } catch (error) {
      if (error instanceof mongoose.Error.CastError && error.path === '_id') {
        throw new BadRequestException('Invalid Product ID given');
      }

      throw error;
    }
  }

  // Create new Product
  async createNewProduct(body: CreateProductDto): Promise<{}> {
    const dbResponse = await this.productsModel.create(body);
    return { success: true, ...dbResponse.toJSON() };
  }

  // Update Product
  async updateProduct(productId: string, body: UpdateProductDto): Promise<{}> {
    const dbResponse = await this.productsModel.updateOne(
      { _id: productId },
      { ...body },
    );

    if (dbResponse.matchedCount === 0) {
      throw new NotFoundException('Product not Found');
    }

    return { success: true, ...dbResponse };
  }

  // Delete a Product
  async deleteProduct(productId: string): Promise<{}> {
    const dbResponse = await this.productsModel.deleteOne({ _id: productId });

    if (dbResponse.deletedCount === 0) {
      throw new NotFoundException('Product not Found!');
    }

    return { success: true, ...dbResponse };
  }
}
