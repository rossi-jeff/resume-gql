import { BaseType } from '../global/base';
import { ObjectType, Field } from '@nestjs/graphql';
import { AddressType, MonthYearType } from '../global/type';

@ObjectType('School')
export class SchoolType extends BaseType {
  @Field({ nullable: true })
  Name: string;

  @Field(type => AddressType, { nullable: true })
  Address: AddressType;

  @Field({ nullable: true })
  Program: string;

  @Field({ nullable: true })
  Degree: string;

  @Field(type => MonthYearType, { nullable: true })
  From: MonthYearType;

  @Field(type => MonthYearType, { nullable: true })
  To: MonthYearType;
}
