import { Injectable, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { JwtTokenGuard } from 'src/guard';
import { Users } from 'src/schemas/users.schemas';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(Users.name) private usersModel: mongoose.Model<Users>,
  ) {}

  // Get Data of Current User
  async getUserData(userId: string) {
    const dbResponse = await this.usersModel.findById(userId);
    const { password: _, ...userInfo } = dbResponse.toJSON();

    return userInfo;
  }
}
