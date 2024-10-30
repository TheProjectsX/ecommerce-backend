import {
  Body,
  Controller,
  Get,
  Param,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminRouteGuard } from 'src/guard';
import { UpdateUserDto } from './dto/update-user.dto';

@UseGuards(AdminRouteGuard)
@Controller('admin')
export class AdminController {
  constructor(private adminServices: AdminService) {}

  // Get User List
  @Get('users')
  async getUsers(@Query() query: any) {
    return this.adminServices.getUsers(query);
  }

  // Change user Settings
  @Put('users/:id')
  async updateUserInfo(
    @Param('id') userId: string,
    @Body() body: UpdateUserDto,
  ) {
    return this.adminServices.updateUserInfo(userId, body);
  }
}
