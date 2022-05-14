import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateParameterDto {
  @Field({ nullable: true })
  Key: string;

  @Field({ nullable: true })
  Value: string;
}
