import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@ArgsType()
export class ApproveCommentDto {
  @IsInt()
  @Field(type => Int)
  Id: number;

  @Field({ nullable: true })
  Approved: boolean;
}
