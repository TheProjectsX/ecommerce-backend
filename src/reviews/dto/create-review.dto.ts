import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Max, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @ApiProperty()
  @IsNotEmpty()
  productId: string;

  @ApiProperty()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiProperty()
  @IsNotEmpty()
  @MaxLength(500)
  review: string;
}
