import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateProductDto {
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @MinLength(10)
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsOptional()
  category: number;

  @ApiProperty()
  @IsOptional()
  images: [
    {
      type: string;
    },
  ];
}
