import { ArgsType, Field } from '@nestjs/graphql';
import { ParameterInput } from '../input';
import { LinkTypeEnum } from '../enum';

@ArgsType()
export class CreateLinkDto {
  @Field({ nullable: true })
  Url: string;

  @Field({ nullable: true })
  Title: string;

  @Field({ nullable: true })
  Description: string;

  @Field(type => LinkTypeEnum, { nullable: true })
  Type: LinkTypeEnum;

  @Field(type => [ParameterInput], { nullable: true })
  Parameters: [ParameterInput];
}
