import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @MinLength(2)
  name: string;

  @IsNotEmpty()
  @MinLength(10)
  description: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  category: number;

  images: [
    {
      type: string;
    },
  ];
}
