import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    return this.userService.loginWithCredentials(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('user-info')
  getUserInfo(@Req() req) {
    return req.user;
  }
}
