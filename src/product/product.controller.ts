import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private productServices: ProductService) {}

  @Get()
  async getProducts(@Query() query: any) {
    return await this.productServices.getProducts(query);
  }

  @Get(':id')
  async getSingleProduct(@Param('id') productId: string) {
    return await this.productServices.getSingleProduct(productId);
  }
}
