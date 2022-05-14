import { ArgsType, Field, Int } from '@nestjs/graphql';
import { EmailTypeEnum } from '../enum';
import { IsInt, IsOptional } from 'class-validator';

@ArgsType()
export class UpdateEmailDto {
  @IsInt()
  @Field(type => Int)
  Id: number;

  @IsOptional()
  @Field(type => EmailTypeEnum, { nullable: true })
  Type: EmailTypeEnum;

  @IsOptional()
  @Field({ nullable: true })
  Address: string;
}
