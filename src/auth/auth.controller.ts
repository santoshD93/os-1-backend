import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Headers,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JWTUtil } from './JWTUtil';
import { UsersService } from './../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UsersService,
    private readonly authService: AuthService,
    private readonly jwtUtil: JWTUtil,
  ) {}

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async profile(@Headers('Authorization') auth: string) {
    const { sub } = this.jwtUtil.decode(auth);
    return this.userService.findOne(sub);
  }
}
