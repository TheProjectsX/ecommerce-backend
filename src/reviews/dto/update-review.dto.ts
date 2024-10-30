import { IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  rating: number;

  @IsOptional()
  review: string;
}
