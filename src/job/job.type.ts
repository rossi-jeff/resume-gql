import { BaseType } from '../global/base';
import { Field, ObjectType } from '@nestjs/graphql';
import { MonthYearType, AddressType } from '../global/type';

@ObjectType('Job')
export class JobType extends BaseType {
  @Field({ nullable: true })
  Company: string;

  @Field(type => AddressType, { nullable: true })
  Address: AddressType;

  @Field({ nullable: true })
  Title: string;

  @Field({ nullable: true })
  Duties: string;

  @Field(type => MonthYearType, { nullable: true })
  From: MonthYearType;

  @Field(type => MonthYearType, { nullable: true })
  To: MonthYearType;
}
