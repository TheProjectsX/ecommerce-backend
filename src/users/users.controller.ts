import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { userInfo, jwtToken } = await this.userServices.register(body);

    response.cookie('access_token', jwtToken).json(userInfo);
  }

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { userInfo, jwtToken } = await this.userServices.login(body);

    response.cookie('access_token', jwtToken).json(userInfo);
  }

  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token').json({ success: true });
  }
}
