import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { UserService } from './user.service';
import { JwtTokenGuard } from 'src/guard';
import { UpdateUserDto } from './dto';

@Controller('me')
@UseGuards(JwtTokenGuard)
export class UserController {
  constructor(private userServices: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getUserInfo(@GetUser('id') userId: string) {
    return this.userServices.getUserData(userId);
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async updateUser(@GetUser('id') userId: string, @Body() body: UpdateUserDto) {
    return this.userServices.updateUser(userId, body);
  }
}
