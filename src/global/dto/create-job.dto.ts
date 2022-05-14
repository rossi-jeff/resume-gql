import { ArgsType, Field } from '@nestjs/graphql';
import { AddressInput, MonthYearInput } from '../input';

@ArgsType()
export class CreateJobDto {
  @Field({ nullable: true })
  Company: string;

  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

  @Field({ nullable: true })
  Title: string;

  @Field({ nullable: true })
  Duties: string;

  @Field(type => MonthYearInput, { nullable: true })
  From: MonthYearInput;

  @Field(type => MonthYearInput, { nullable: true })
  To: MonthYearInput;
}
