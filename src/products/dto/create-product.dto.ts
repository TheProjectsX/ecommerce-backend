import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  category: number;

  images: [
    {
      type: string;
    },
  ];
}
