import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class PostMessageDto {
  @Field({ nullable: true })
  Name: string;

  @Field({ nullable: true })
  Message: string;

  @Field({ nullable: true })
  ChannelId: string;
}
