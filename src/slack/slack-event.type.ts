import { BaseType } from '../global/base/base-type.type';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('SlackEventItem')
export class SlackEventItemType {
  @Field({ nullable: true })
  Type: string;

  @Field({ nullable: true })
  Channel: string;

  @Field({ nullable: true })
  TS: string;
}

@ObjectType('SlackPreviousMessage')
export class SlackPreviousMessageType {
  @Field({ nullable: true })
  ClientMsgId: string;

  @Field({ nullable: true })
  Type: string;

  @Field({ nullable: true })
  Text: string;

  @Field({ nullable: true })
  User: string;

  @Field({ nullable: true })
  Team: string;

  @Field({ nullable: true })
  TS: string;
}

@ObjectType('SlackEvent')
export class SlackEventType extends BaseType {
  @Field({ nullable: true })
  EventId: string;

  @Field({ nullable: true })
  EventTS: string;

  @Field({ nullable: true })
  ClientMsgId: string;

  @Field({ nullable: true })
  Type: string;

  @Field({ nullable: true })
  Text: string;

  @Field({ nullable: true })
  SubType: string;

  @Field({ nullable: true })
  Channel: string;

  @Field({ nullable: true })
  ChannelType: string;

  @Field({ nullable: true })
  User: string;

  @Field({ nullable: true })
  Reaction: string;

  @Field({ nullable: true })
  Team: string;

  @Field(type => SlackEventItemType, { nullable: true })
  Item: SlackEventItemType;

  @Field(type => SlackPreviousMessageType, { nullable: true })
  PreviousMessage: SlackPreviousMessageType;

  @Field({ nullable: true })
  ThreadTS: string;

  @Field({ nullable: true })
  BotId: string;
}
