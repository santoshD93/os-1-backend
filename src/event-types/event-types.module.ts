import { Module } from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { EventTypesController } from './event-types.controller';
import { PrismaService } from './../prisma.service';

@Module({
  controllers: [EventTypesController],
  providers: [EventTypesService, PrismaService],
})
export class EventTypesModule {}
