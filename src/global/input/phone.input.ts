import { InputType, Field, Int } from '@nestjs/graphql';
import { PhoneTypeEnum } from '../enum';
import { IsOptional } from 'class-validator';

@InputType()
export class PhoneInput {
  @Field(type => Int)
  Id: number;

  @IsOptional()
  @Field(type => PhoneTypeEnum, { nullable: true })
  Type: PhoneTypeEnum;

  @IsOptional()
  @Field({ nullable: true })
  Number: string;

  @IsOptional()
  @Field({ nullable: true })
  Extension: string;
}
