import { ArgsType, Field, Int } from '@nestjs/graphql';
import { ParameterInput } from '../input';
import { IsInt, IsOptional } from 'class-validator';
import { LinkTypeEnum } from '../enum';

@ArgsType()
export class UpdateLinkDto {
  @IsInt()
  @Field(type => Int)
  Id: number;

  @IsOptional()
  @Field({ nullable: true })
  Url: string;

  @IsOptional()
  @Field({ nullable: true })
  Title: string;

  @IsOptional()
  @Field({ nullable: true })
  Description: string;

  @IsOptional()
  @Field(type => LinkTypeEnum, { nullable: true })
  Type: LinkTypeEnum;

  @IsOptional()
  @Field(type => [ParameterInput], { nullable: true })
  Parameters: [ParameterInput];
}
