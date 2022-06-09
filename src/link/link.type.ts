import { BaseType } from '../global/base';
import { Field, ObjectType } from '@nestjs/graphql';
import { ParameterType } from '../parameter/parameter.type';
import { LinkTypeEnum } from '../global/enum';

@ObjectType('Link')
export class LinkType extends BaseType {
  @Field({ nullable: true })
  Url?: string;

  @Field({ nullable: true })
  Title?: string;

  @Field({ nullable: true })
  Description?: string;

  @Field(type => LinkTypeEnum, { nullable: true })
  Type?: LinkTypeEnum;

  @Field(type => [ParameterType], { nullable: true })
  Parameters?: [ParameterType];
}
