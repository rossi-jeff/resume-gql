import { BaseType } from '../global/base';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('SlackChannel')
export class SlackChannelType extends BaseType {
  @Field({ nullable: true })
  ChannelId: string;

  @Field({ nullable: true })
  ChannelName: string;
}
