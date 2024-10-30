import { IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  @MinLength(2)
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @MinLength(10)
  @IsOptional()
  description: string;

  @IsNotEmpty()
  @IsOptional()
  price: number;

  @IsNotEmpty()
  @IsOptional()
  category: number;

  @IsOptional()
  images: [
    {
      type: string;
    },
  ];
}
