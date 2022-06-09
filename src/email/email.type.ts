import { BaseType } from '../global/base';
import { EmailTypeEnum } from '../global/enum';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Email')
export class EmailType extends BaseType {
  @Field(type => EmailTypeEnum, { nullable: true })
  Type?: EmailTypeEnum;

  @Field({ nullable: true })
  Address?: string;
}
