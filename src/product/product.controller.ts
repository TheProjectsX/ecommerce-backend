import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, UpdateProductDto } from './dto';

@Controller('products')
export class ProductController {
  constructor(private productServices: ProductService) {}

  // Get Products
  @Get()
  async getProducts(@Query() query: any) {
    return await this.productServices.getProducts(query);
  }

  // Get Single Product
  @Get(':id')
  async getSingleProduct(@Param('id') productId: string) {
    return await this.productServices.getSingleProduct(productId);
  }

  // Create new Product
  @Post()
  async createNewProduct(@Body() body: CreateProductDto) {
    return await this.productServices.createNewProduct(body);
  }

  // Update Product
  @Put(':id')
  async updateProduct(
    @Param('id') productId: string,
    @Body() body: UpdateProductDto,
  ) {
    return await this.productServices.updateProduct(productId, body);
  }

  // Delete Product
  @Delete(':id')
  async deleteProduct(@Param('id') productId: string) {
    return await this.productServices.deleteProduct(productId);
  }
}
