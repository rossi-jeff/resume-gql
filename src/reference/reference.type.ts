import { AddressType } from '../global/type';
import { Field, ObjectType } from '@nestjs/graphql';
import { PhoneType } from '../phone/phone.type';
import { EmailType } from '../email/email.type';
import { UserType } from '../global/base';
import { CommentType } from '../comment/comment.type';

@ObjectType('Reference')
export class ReferenceType extends UserType {
  @Field(type => AddressType, { nullable: true })
  Address: AddressType;

  @Field({ nullable: true })
  Title: string;

  @Field({ nullable: true })
  Company: string;

  @Field(type => [PhoneType], { nullable: true })
  Phones: [PhoneType];

  @Field(type => [EmailType], { nullable: true })
  Emails: [EmailType];

  @Field(type => [CommentType], { nullable: true })
  Comments: [CommentType];

  @Field({ nullable: true })
  Approved: boolean;
}
