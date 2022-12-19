import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, EventType } from '@prisma/client';

@Injectable()
export class EventTypesService {
  constructor(private prisma: PrismaService) {}

  create(data: Prisma.EventTypeCreateInput): Promise<EventType> {
    return this.prisma.eventType.create({
      data,
    });
  }

  findAll() {
    return this.prisma.eventType.findMany();
  }

  findOne(id: number) {
    return this.prisma.eventType.findUnique({
      where: { id },
    });
  }

  update(id: number, data: Prisma.EventTypeUpdateInput) {
    return this.prisma.eventType.update({
      where: { id },
      data,
    });
  }

  remove(id: number) {
    return this.prisma.eventType.delete({
      where: { id },
    });
  }
}
