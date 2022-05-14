import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { AddressInput, MonthYearInput } from '../input';

@ArgsType()
export class UpdateJobDto {
  @IsInt()
  @Field(type => Int)
  Id: number;

  @IsOptional()
  @Field({ nullable: true })
  Company: string;

  @IsOptional()
  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

  @IsOptional()
  @Field({ nullable: true })
  Title: string;

  @IsOptional()
  @Field({ nullable: true })
  Duties: string;

  @IsOptional()
  @Field(type => MonthYearInput, { nullable: true })
  From: MonthYearInput;

  @IsOptional()
  @Field(type => MonthYearInput, { nullable: true })
  To: MonthYearInput;
}
