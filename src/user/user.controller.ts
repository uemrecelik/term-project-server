import { Controller, Get, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.userService.loginWithCredentials(req.user);
  }

  @Get()
  getUserData(@Query('id') userId: number): Promise<User> {
    return this.userService.getUserData(userId);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user-info')
  getUserInfo(@Req() req) {
    return req.user;
  }
}
