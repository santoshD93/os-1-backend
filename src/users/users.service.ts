import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from './../prisma.service';
import { exclude } from './helpers';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput) {
    const hashedPassword = await bcrypt.hash(data.password, 12);

    const user = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
      include: {
        eventTypes: true,
      },
    });

    return exclude(user, ['password']);
  }

  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        eventTypes: true,
      },
    });

    return users.map((u) => exclude(u, ['password']));
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        eventTypes: true,
      },
    });

    return exclude(user, ['password']);
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    const user = await this.prisma.user.update({
      where: { id },
      data,
      include: {
        eventTypes: true,
      },
    });

    return exclude(user, ['password']);
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: { id },
    });
  }
}
