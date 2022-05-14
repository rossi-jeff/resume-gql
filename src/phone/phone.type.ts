import { BaseType } from '../global/base';
import { Field, ObjectType } from '@nestjs/graphql';
import { PhoneTypeEnum } from '../global/enum';

@ObjectType('Phone')
export class PhoneType extends BaseType {
  @Field(type => PhoneTypeEnum, { nullable: true })
  Type: PhoneTypeEnum;

  @Field({ nullable: true })
  Number: string;

  @Field({ nullable: true })
  Extension: string;
}
