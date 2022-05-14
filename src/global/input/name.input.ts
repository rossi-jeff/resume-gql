import { InputType, Field } from '@nestjs/graphql';
import { Salutation } from '../enum';
import { IsOptional } from 'class-validator';

@InputType()
export class NameInput {
  @IsOptional()
  @Field(type => Salutation, { nullable: true })
  Salutation: Salutation;

  @IsOptional()
  @Field({ nullable: true })
  First: string;

  @IsOptional()
  @Field({ nullable: true })
  Middle: string;

  @IsOptional()
  @Field({ nullable: true })
  Last: string;

  @IsOptional()
  @Field({ nullable: true })
  Suffix: string;
}
