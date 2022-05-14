import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { PhoneTypeEnum } from '../enum';

@ArgsType()
export class UpdatePhoneDto {
  @IsInt()
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
