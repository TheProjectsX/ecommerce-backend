import { Optional } from '@nestjs/common';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @MinLength(2)
  @Optional()
  name: string;

  @IsNotEmpty()
  @MinLength(10)
  @Optional()
  description: string;

  @IsNotEmpty()
  @Optional()
  price: number;

  @IsNotEmpty()
  @Optional()
  category: number;

  @Optional()
  images: [
    {
      type: string;
    },
  ];
}
