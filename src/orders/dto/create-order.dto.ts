import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  Min,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class ProductDetails {
  @ApiProperty()
  @IsNotEmpty()
  product: string;

  @ApiProperty()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @ApiProperty()
  @IsNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => ProductDetails)
  orders: ProductDetails[];

  @ApiProperty()
  @IsOptional()
  @IsIn(['pending', 'completed', 'canceled'], {
    message:
      'Status can only be one of following: pending, completed, canceled',
  })
  status: string;

  @ApiProperty()
  @IsNotEmpty()
  totalAmount: number;
}
