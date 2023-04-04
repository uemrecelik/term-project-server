import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(reqUsername: string): Promise<any> {
    return this.userRepository.findOne({
      where: { username: reqUsername },
    });
  }
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.findOne(username);

    if (user && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async loginWithCredentials(user: any) {
    const payload = { username: user.username, sub: user.id };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async getUserData(userId: number): Promise<User> {
    const userData: User = await this.userRepository.findOne({
      where: { id: userId },
    });
    return userData;
  }
}
