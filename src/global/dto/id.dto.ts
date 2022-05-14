import { Field, Int, ArgsType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class IdDto {
  @IsInt()
  @Field(type => Int)
  Id: number;
}
