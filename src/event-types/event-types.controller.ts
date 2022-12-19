import { Prisma } from '@prisma/client';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { EventTypesService } from './event-types.service';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';

@Controller('event-types')
export class EventTypesController {
  constructor(private readonly eventTypesService: EventTypesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() eventTypeCreateInput: Prisma.EventTypeCreateInput) {
    return this.eventTypesService.create(eventTypeCreateInput);
  }

  @Get()
  findAll() {
    return this.eventTypesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventTypesService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() eventTypeUpdateInput: Prisma.EventTypeUpdateInput,
  ) {
    return this.eventTypesService.update(+id, eventTypeUpdateInput);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventTypesService.remove(+id);
  }
}
