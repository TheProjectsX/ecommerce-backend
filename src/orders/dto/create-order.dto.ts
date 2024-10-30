import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class ProductDetails {
  @IsNotEmpty()
  product: string;

  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductDetails)
  orders: ProductDetails[];

  @IsOptional()
  @IsIn(['pending', 'completed', 'canceled'], {
    message:
      'Status can only be one of following: pending, completed, canceled',
  })
  status: string;

  @IsNotEmpty()
  totalAmount: number;
}
