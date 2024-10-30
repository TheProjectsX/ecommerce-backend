import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UpdateReviewDto {
  @ApiProperty()
  @IsOptional()
  rating: number;

  @ApiProperty()
  @IsOptional()
  review: string;
}
