import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { EventsService } from './events.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() eventCreateInput: Prisma.EventCreateInput) {
    return this.eventsService.create(eventCreateInput);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query()
    query: {
      skip?: string;
      take?: string;
      type?: string | string[];
      mode?: 'active' | 'past';
    },
  ) {
    const { skip, take, type, mode } = query;
    return this.eventsService.findAll({
      skip: skip ? +skip : 0,
      take: take ? +take : 20,
      where: {
        ...(type
          ? {
              eventTypeId:
                typeof type === 'string' ? +type : { in: type.map((t) => +t) },
            }
          : {}),
        ...(mode
          ? {
              date:
                mode === 'active' ? { gte: new Date() } : { lt: new Date() },
            }
          : {}),
      },
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventsService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() eventUpdateInput: Prisma.EventUpdateInput,
  ) {
    return this.eventsService.update(+id, eventUpdateInput);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventsService.remove(+id);
  }
}
