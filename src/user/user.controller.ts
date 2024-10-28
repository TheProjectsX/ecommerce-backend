import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/decorator';
import { UserService } from './user.service';
import { JwtTokenGuard } from 'src/guard';

@Controller('me')
@UseGuards(JwtTokenGuard)
export class UserController {
  constructor(private userServices: UserService) {}

  @Get()
  async getUserInfo(@GetUser('id') userId: string) {
    return this.userServices.getUserData(userId);
  }
}
