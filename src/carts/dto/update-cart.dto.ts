import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class UpdateCartDto {
  @ApiProperty()
  @Min(1)
  quantity: number;
}
