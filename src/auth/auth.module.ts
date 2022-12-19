import { JWTUtil } from './JWTUtil';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from './../prisma.service';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';
import { UsersService } from './../users/users.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '3600s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, JWTUtil, UsersService],
  exports: [AuthService],
})
export class AuthModule {}
