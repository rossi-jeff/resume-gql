import { Resolver, Args, Mutation, Query, Subscription } from '@nestjs/graphql';
import { SlackService } from './slack.service';
import {
  CreateConversationDto,
  PostMessageDto,
  EventReceivedDto,
} from '../global/dto';
import { SlackChannelType } from './slack-channel.type';
import { SlackEventType } from './slack-event.type';

@Resolver('Slack')
export class SlackResolver {
  constructor(private slackService: SlackService) {}

  @Mutation(returns => SlackChannelType)
  async createConversation(
    @Args() createConversationDto: CreateConversationDto,
  ) {
    return this.slackService.createConversation(createConversationDto);
  }

  @Query(returns => [SlackChannelType])
  async listConversations() {
    return this.slackService.listConversations();
  }

  @Mutation(returns => Boolean)
  async postMessage(@Args() postMessageDto: PostMessageDto) {
    return this.slackService.postMessage(postMessageDto);
  }

  @Subscription(returns => SlackEventType, {
    filter: (payload, variables) =>
      payload.eventReceived.Channel === variables.ChannelId ||
      (payload.eventReceived.Item &&
        payload.eventReceived.Item.Channel === variables.ChannelId),
  })
  eventReceived(@Args() eventReceivedDto: EventReceivedDto) {
    return this.slackService.pubsub.asyncIterator('eventReceived');
  }

  @Query(returns => [SlackEventType])
  listChannelEvents(@Args() eventReceivedDto: EventReceivedDto) {
    return this.slackService.listChannelEvents(eventReceivedDto);
  }
}
