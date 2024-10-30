import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { AdminRouteGuard } from 'src/guard';

@Controller('products')
export class ProductsController {
  constructor(private productsServices: ProductsService) {}

  // Get Products
  @Get()
  @HttpCode(HttpStatus.OK)
  async getProducts(@Query() query: any) {
    return await this.productsServices.getProducts(query);
  }

  // Get Single Product
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getSingleProduct(@Param('id') productId: string) {
    return await this.productsServices.getSingleProduct(productId);
  }

  // Create new Product
  @UseGuards(AdminRouteGuard)
  @Post()
  async createNewProduct(@Body() body: CreateProductDto) {
    return await this.productsServices.createNewProduct(body);
  }

  // Update Product
  @UseGuards(AdminRouteGuard)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateProduct(
    @Param('id') productId: string,
    @Body() body: UpdateProductDto,
  ) {
    return await this.productsServices.updateProduct(productId, body);
  }

  // Delete Product
  @UseGuards(AdminRouteGuard)
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async deleteProduct(@Param('id') productId: string) {
    return await this.productsServices.deleteProduct(productId);
  }
}
