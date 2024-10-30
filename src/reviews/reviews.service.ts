import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Reviews } from 'src/schemas';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Reviews.name) private reviewsModel: mongoose.Model<Reviews>,
  ) {}

  // Get Cart items
  async getReviewItems(query: any): Promise<{
    success: boolean;
    pagination: {
      currentCount: number;
      total: number;
      has_next_page: boolean;
      nextPage: number;
    };
    data: Reviews[];
  }> {
    const { productId, limit = 10, page = 1 } = query;
    if (!productId) {
      throw new BadRequestException('No Product Id Provided!');
    }
    const skip = (page - 1) * limit;

    const filter = { productId };

    const reviewsData = await this.reviewsModel
      .find(filter)
      .limit(limit)
      .skip(skip)
      .populate('userId', 'username profilePicture')
      .exec();
    const totalReviewsCount = await this.reviewsModel.countDocuments(filter);

    const pagination = {
      currentCount: limit,
      total: totalReviewsCount,
      has_next_page: page * limit < totalReviewsCount,
      nextPage: page + 1,
    };

    const returnData = {
      success: true,
      pagination,
      data: reviewsData,
    };

    return returnData;
  }

  // Get Single Cart
  async getSingleReview(reviewId: string) {
    try {
      const dbResponse = await this.reviewsModel
        .findOne({
          _id: reviewId,
        })
        .populate('userId', 'username profilePicture');
      if (!dbResponse) {
        throw new NotFoundException('Item not Found!');
      }

      return { success: true, ...dbResponse.toJSON() };
    } catch (error) {
      if (error instanceof mongoose.Error.CastError && error.path === '_id') {
        throw new BadRequestException('Invalid Item ID given');
      }

      throw error;
    }
  }

  // Create new Cart
  async createReview(userId: string, body: CreateReviewDto) {
    body['userId'] = userId;

    const dbResponse = await this.reviewsModel.create(body);
    return { success: true, ...dbResponse.toJSON() };
  }

  // Update cart Items
  async updateReview(userId: string, reviewId: string, body: UpdateReviewDto) {
    const dbResponse = await this.reviewsModel.updateOne(
      { userId: userId, _id: reviewId },
      { ...body },
    );

    if (dbResponse.matchedCount === 0) {
      throw new NotFoundException('Item not Found!');
    }

    return { success: true, ...dbResponse };
  }

  // Delete Cart Items
  async deleteReview(userId: string, reviewId: string) {
    const dbResponse = await this.reviewsModel.deleteOne({
      userId: userId,
      _id: reviewId,
    });

    if (dbResponse.deletedCount === 0) {
      throw new NotFoundException('Item not Found!');
    }

    return { success: true, ...dbResponse };
  }

  // Add Like to Review
  async addLike(userId: string, reviewId: string) {
    const alreadyLiked = await this.reviewsModel.findOne({
      _id: reviewId,
      likedBy: { $elemMatch: { $eq: userId } },
    });
    if (alreadyLiked) {
      throw new BadRequestException('Already Liked this Review!');
    }

    const dbResponse = await this.reviewsModel.updateOne(
      { _id: reviewId },
      {
        $push: {
          likedBy: userId,
        },
      },
    );

    if (dbResponse.matchedCount === 0) {
      throw new NotFoundException('Item not Found!');
    }

    return { success: true, ...dbResponse };
  }
}
