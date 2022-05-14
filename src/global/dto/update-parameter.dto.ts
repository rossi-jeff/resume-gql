import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';

@ArgsType()
export class UpdateParameterDto {
  @IsInt()
  @Field(type => Int)
  Id: number;

  @IsOptional()
  @Field({ nullable: true })
  Key: string;

  @IsOptional()
  @Field({ nullable: true })
  Value: string;
}
