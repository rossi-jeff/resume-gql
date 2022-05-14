import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreatePageDto {
  @Field()
  Name: string;

  @Field({ nullable: true })
  Content: string;
}
