import { Field, Int, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class LimitOffsetDto {
  @IsOptional()
  @Field(type => Int, { nullable: true })
  Limit: number;

  @IsOptional()
  @Field(type => Int, { nullable: true })
  Offset: number;
}
