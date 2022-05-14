import { InputType, Field, Int } from '@nestjs/graphql';
import { EmailTypeEnum } from '../enum';
import { IsOptional } from 'class-validator';

@InputType()
export class EmailInput {
  @Field(type => Int)
  Id: number;

  @IsOptional()
  @Field(type => EmailTypeEnum, { nullable: true })
  Type: EmailTypeEnum;

  @IsOptional()
  @Field({ nullable: true })
  Address: string;
}
