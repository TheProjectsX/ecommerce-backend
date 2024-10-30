import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateCartDto {
  @ApiProperty()
  @IsNotEmpty()
  product: string;

  @ApiProperty()
  @Min(1)
  quantity: number;
}
