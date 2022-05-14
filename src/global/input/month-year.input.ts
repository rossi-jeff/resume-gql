import { InputType, Field, Int } from '@nestjs/graphql';
import { MonthEnum } from '../enum';

@InputType()
export class MonthYearInput {
  @Field(type => MonthEnum, { nullable: true })
  Month: MonthEnum;

  @Field(type => Int)
  Year: number;
}
