import { BaseType } from '../global/base';
import { ObjectType, Field } from '@nestjs/graphql';
import { CommentTypeEnum } from '../global/enum';
import { AdminType } from '../admin/admin.type';
import { ReferenceType } from '../reference/reference.type';
import { VisitorType } from '../visitor/visitor.type';

@ObjectType('Comment')
export class CommentType extends BaseType {
  @Field(type => CommentTypeEnum, { nullable: true })
  Type: CommentTypeEnum;

  @Field({ nullable: true })
  Message: string;

  @Field({ nullable: true })
  Approved: boolean;

  @Field(type => [AdminType], { nullable: true })
  Admins: [AdminType];

  @Field(type => [ReferenceType], { nullable: true })
  References: [ReferenceType];

  @Field(type => [VisitorType], { nullable: true })
  Visitors: [VisitorType];
}
