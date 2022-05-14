import { ArgsType, Field } from '@nestjs/graphql';
import { ConversationSource } from '../enum';

@ArgsType()
export class CreateConversationDto {
  @Field(type => ConversationSource, { nullable: true })
  Source: ConversationSource;

  @Field({ nullable: true })
  Name: string;
}
