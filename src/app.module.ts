import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventTypesModule } from './event-types/event-types.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';

@Module({
  imports: [EventTypesModule, UsersModule, AuthModule, EventsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
