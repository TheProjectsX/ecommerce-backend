import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Users } from 'src/schemas/users.schemas';
import { UpdateUserDto } from './dto/update-user.dto';

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

  // Update User info In DB
  async updateUser(userId: string, body: UpdateUserDto) {
    console.log(userId, body);
    const dbResponse = await this.usersModel.updateOne(
      { _id: userId },
      { ...body },
    );

    return dbResponse;
  }
}
