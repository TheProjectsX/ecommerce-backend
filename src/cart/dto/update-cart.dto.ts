import { IsNotEmpty, Min } from 'class-validator';

export class UpdateCartDto {
  @Min(1)
  quantity: number;
}
