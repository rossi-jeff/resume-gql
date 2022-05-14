import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UpdatePageDto {
  @Field()
  Name: string;

  @Field({ nullable: true })
  Content: string;
}
