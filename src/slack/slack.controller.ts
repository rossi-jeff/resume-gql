import { Controller, Post, Body, Headers, Res } from '@nestjs/common';
import { SlackService } from './slack.service';

@Controller('slack')
export class SlackController {
  constructor(private slackService: SlackService) {}

  @Post('event')
  receiveEvent(
    @Headers() headers: any,
    @Body() event: any,
    @Res() response: any,
  ) {
    return this.slackService.receiveEvent(headers, event, response);
  }
}
