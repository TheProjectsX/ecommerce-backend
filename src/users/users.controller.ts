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
import { UsersService } from './users.service';
import { JwtTokenGuard } from 'src/guard';
import { UpdateUserDto } from './dto';

@Controller('me')
@UseGuards(JwtTokenGuard)
export class UsersController {
  constructor(private userServices: UsersService) {}

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
