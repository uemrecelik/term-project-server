import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { LocalStrategy } from '../local.strategy';
import { JwtStrategy } from '../jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [UserService, LocalStrategy, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      secret: '147147',
      signOptions: { expiresIn: '1h' },
    }),
  ],
})
export class UserModule {}
