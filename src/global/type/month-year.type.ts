import { ObjectType, Field, Int } from '@nestjs/graphql';
import { MonthEnum } from '../enum';

@ObjectType('MonthYear')
export class MonthYearType {
  @Field(type => MonthEnum, { nullable: true })
  Month: MonthEnum;

  @Field(type => Int)
  Year: number;
}
