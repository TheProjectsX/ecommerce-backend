import { IsNotEmpty, Min } from 'class-validator';

export class CreateCartDto {
  @IsNotEmpty()
  product: string;

  @Min(1)
  quantity: number;
}
