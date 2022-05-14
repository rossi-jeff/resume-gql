import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class NameDto {
  @Field()
  Name: string;
}
