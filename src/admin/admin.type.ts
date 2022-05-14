import { UserType } from '../global/base';
import { ObjectType, Field } from '@nestjs/graphql';
import { AddressType } from '../global/type';
import { PhoneType } from '../phone/phone.type';
import { EmailType } from '../email/email.type';
import { CommentType } from '../comment/comment.type';

@ObjectType('Admin')
export class AdminType extends UserType {
  @Field(type => AddressType, { nullable: true })
  Address: AddressType;

  @Field(type => [PhoneType], { nullable: true })
  Phones: [PhoneType];

  @Field(type => [EmailType], { nullable: true })
  Emails: [EmailType];

  @Field(type => [CommentType], { nullable: true })
  Comments: [CommentType];
}
