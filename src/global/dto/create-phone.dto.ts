import { ArgsType, Field } from '@nestjs/graphql';
import { PhoneTypeEnum } from '../enum';
import { IsOptional } from 'class-validator';

@ArgsType()
export class CreatePhoneDto {
  @Field()
  Number: string;

  @IsOptional()
  @Field(type => PhoneTypeEnum, { nullable: true })
  Type: PhoneTypeEnum;

  @IsOptional()
  @Field({ nullable: true })
  Extension: string;

  @IsOptional()
  @Field({ nullable: true })
  AdminUUID: string;

  @IsOptional()
  @Field({ nullable: true })
  ReferenceUUID: string;
}
