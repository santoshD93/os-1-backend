import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { exclude } from '../users/helpers';
import { PrismaService } from './../prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.prisma.user.findUnique({
        where: { email },
        include: {
          eventTypes: true,
        },
      });

      if (!user) {
        throw Error('Incorrect email or password');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw Error('Incorrect email or password');
      }

      return exclude(user, ['password']);
    } catch (err) {
      throw Error(err.message);
    }
  }

  async login({ email, password }: { email: string; password: string }) {
    const user = await this.validateUser(email, password);

    const payload = { username: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: user,
    };
  }
}
