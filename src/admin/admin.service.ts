import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from 'src/schemas';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel(Users.name) private usersModel: mongoose.Model<Users>,
  ) {}

  // Get User List
  async getUsers(query: any) {
    const { limit = 10, page = 1 } = query;

    const skip = (page - 1) * limit;

    const usersData = await this.usersModel
      .find()
      .limit(limit)
      .skip(skip)
      .select('-password')
      .exec();
    const totalUsersCount = await this.usersModel.estimatedDocumentCount();

    const pagination = {
      currentCount: limit,
      total: totalUsersCount,
      has_next_page: page * limit < totalUsersCount,
      nextPage: page + 1,
    };

    const returnData = {
      success: true,
      pagination,
      data: usersData,
    };

    return returnData;
  }

  // Change user Status
  async updateUserInfo(userId: string, body: UpdateUserDto) {
    const dbResponse = await this.usersModel.updateOne(
      { _id: userId },
      { ...body },
    );

    if (dbResponse.matchedCount === 0) {
      throw new NotFoundException('User not Found');
    }

    return { success: true, ...dbResponse };
  }
}
