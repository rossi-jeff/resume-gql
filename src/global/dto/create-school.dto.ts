import { ArgsType, Field } from '@nestjs/graphql';
import { AddressInput, MonthYearInput } from '../input';

@ArgsType()
export class CreateSchoolDto {
  @Field({ nullable: true })
  Name: string;

  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

  @Field({ nullable: true })
  Degree: string;

  @Field(type => MonthYearInput, { nullable: true })
  From: MonthYearInput;

  @Field(type => MonthYearInput, { nullable: true })
  To: MonthYearInput;
}
