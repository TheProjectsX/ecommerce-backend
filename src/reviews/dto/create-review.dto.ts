import { IsNotEmpty, Max, MaxLength, Min } from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  productId: string;

  @Min(1)
  @Max(5)
  rating: number;

  @IsNotEmpty()
  @MaxLength(500)
  review: string;
}
