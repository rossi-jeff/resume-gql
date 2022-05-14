import { Module } from '@nestjs/common';
import { SlackService } from './slack.service';
import { SlackController } from './slack.controller';
import { SlackEvent } from './slack-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SlackResolver } from './slack.resolver';
import { SlackChannel } from './slack-channel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SlackEvent, SlackChannel])],
  providers: [SlackService, SlackResolver],
  controllers: [SlackController],
})
export class SlackModule {}
