import { Injectable } from '@nestjs/common';
import { Event, Prisma } from '@prisma/client';
import { PrismaService } from './../prisma.service';

@Injectable()
export class EventsService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EventCreateInput) {
    return this.prisma.event.create({
      data,
      include: {
        eventType: true,
      },
    });
  }

  findAll(params: {
    skip?: number;
    take?: number;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }): Promise<Event[]> {
    const { skip, take, where, orderBy } = params;

    return this.prisma.event.findMany({
      skip,
      take,
      where,
      orderBy,
      include: {
        eventType: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.event.findUnique({
      where: { id },
      include: {
        eventType: true,
      },
    });
  }

  update(id: number, data: Prisma.EventUpdateInput) {
    return this.prisma.event.update({
      where: { id },
      data,
      include: {
        eventType: true,
      },
    });
  }

  remove(id: number) {
    return this.prisma.event.delete({
      where: { id },
    });
  }
}
