import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class EventReceivedDto {
  @Field({ nullable: true })
  ChannelId: string;
}
