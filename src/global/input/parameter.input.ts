import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ParameterInput {
  @Field(type => Int)
  Id: number;

  @Field({ nullable: true })
  Key: string;

  @Field({ nullable: true })
  Value: string;
}
