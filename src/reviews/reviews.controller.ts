import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { JwtTokenGuard } from 'src/guard';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsServices: ReviewsService) {}

  // Get Cart items
  @Get('')
  async getReviewItems(@Query() query: any) {
    return await this.reviewsServices.getReviewItems(query);
  }

  // Get Single Cart
  @Get(':id')
  async getSingleReview(@Param('id') reviewId: string) {
    return await this.reviewsServices.getSingleReview(reviewId);
  }

  // Create new Cart
  @UseGuards(JwtTokenGuard)
  @Post()
  async createReview(
    @GetUser('id') userId: string,
    @Body() body: CreateReviewDto,
  ) {
    return await this.reviewsServices.createReview(userId, body);
  }

  // Update cart Items
  @UseGuards(JwtTokenGuard)
  @Put(':id')
  async updateReview(
    @GetUser('id') userId: string,
    @Param('id') reviewId: string,
    @Body() body: UpdateReviewDto,
  ) {
    return await this.reviewsServices.updateReview(userId, reviewId, body);
  }

  // Delete Cart Items
  @UseGuards(JwtTokenGuard)
  @Delete(':id')
  async deleteReview(
    @GetUser('id') userId: string,
    @Param('id') reviewId: string,
  ) {
    return await this.reviewsServices.deleteReview(userId, reviewId);
  }

  // Add like to Review
  @UseGuards(JwtTokenGuard)
  @Put(':id/like')
  async addLike(@GetUser('id') userId: string, @Param('id') reviewId: string) {
    return this.reviewsServices.addLike(userId, reviewId);
  }
}
