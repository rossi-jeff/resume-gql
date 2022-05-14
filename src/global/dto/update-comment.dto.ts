import { ArgsType, Field, Int } from '@nestjs/graphql';
import { IsInt, IsOptional } from 'class-validator';
import { CommentTypeEnum } from '../enum';

@ArgsType()
export class UpdateCommentDto {
  @IsInt()
  @Field(type => Int)
  Id: number;

  @IsOptional()
  @Field(type => CommentTypeEnum, { nullable: true })
  Type: CommentTypeEnum;

  @IsOptional()
  @Field({ nullable: true })
  Message: string;
}
