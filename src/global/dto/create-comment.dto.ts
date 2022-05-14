import { ArgsType, Field } from '@nestjs/graphql';
import { CommentTypeEnum } from '../enum';
import { IsOptional } from 'class-validator';

@ArgsType()
export class CreateCommentDto {
  @Field(type => CommentTypeEnum, { nullable: true })
  Type: CommentTypeEnum;

  @Field({ nullable: true })
  Message: string;

  @IsOptional()
  @Field({ nullable: true })
  AdminUUID: string;

  @IsOptional()
  @Field({ nullable: true })
  ReferenceUUID: string;

  @IsOptional()
  @Field({ nullable: true })
  VisitorUUID: string;
}
