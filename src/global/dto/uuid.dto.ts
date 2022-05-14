import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class UuidDto {
  @Field()
  UUID: string;
}
