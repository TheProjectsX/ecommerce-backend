import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './schemas/users.schemas';
import * as mongoose from 'mongoose';
import { RegisterUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(Users.name)
    private usersModel: mongoose.Model<Users>,
    private jwtServices: JwtService,
  ) {}

  async register(
    body: RegisterUserDto,
  ): Promise<{ userInfo: Object; jwtToken: string }> {
    const hashedPass = bcrypt.hashSync(body.password, 12);
    body['password'] = hashedPass;

    try {
      const response = (await this.usersModel.create(body)).toJSON();
      const { password: _, ...userInfo } = response;

      const jwtToken = await this.jwtServices.signAsync({
        id: userInfo._id,
        email: userInfo.email,
      });

      return { userInfo, jwtToken };
    } catch (error) {
      if (error instanceof mongoose.Error) {
        throw new ForbiddenException(String(error));
      } else if (error.code === 11000) {
        throw new ForbiddenException('Email already taken');
      } else {
        throw error;
      }
    }
  }

  async login(body: LoginUserDto): Promise<{
    userInfo: Object;
    jwtToken: string;
  }> {
    try {
      const userInDB = await this.usersModel.findOne({ email: body.email });
      if (!userInDB) {
        throw new ForbiddenException('Invalid Credentials');
      }

      const passMatch = bcrypt.compareSync(body.password, userInDB.password);
      if (!passMatch) {
        throw new ForbiddenException('Invalid Credentials');
      }

      const { password: _, ...userInfo } = userInDB.toJSON();

      const jwtToken = await this.jwtServices.signAsync({
        id: userInfo._id,
        email: userInfo.email,
      });

      return {
        userInfo,
        jwtToken,
      };
    } catch (error) {
      throw error;
    }
  }
}
