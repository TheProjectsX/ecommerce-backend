import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Response } from 'express';
import { JwtTokenGuard } from 'src/guard';

@Controller('auth')
export class AuthController {
  constructor(private userServices: AuthService) {}

  // Register as New User
  @Post('/register')
  @HttpCode(HttpStatus.OK)
  async register(
    @Body() body: RegisterUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { userInfo, jwtToken } = await this.userServices.register(body);

    response.cookie('access_token', jwtToken).json(userInfo);
  }

  // Login
  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { userInfo, jwtToken } = await this.userServices.login(body);

    response.cookie('access_token', jwtToken).json(userInfo);
  }

  // Logout User
  @UseGuards(JwtTokenGuard)
  @Get('/logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('access_token').json({ success: true });
  }
}
