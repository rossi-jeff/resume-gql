import { BaseType } from '../global/base';
import { ObjectType, Field } from '@nestjs/graphql';
import { NameType, AddressType } from '../global/type';
import { PhoneTypeEnum, EmailTypeEnum, PreferredContact } from '../global/enum';

@ObjectType('Contact')
export class ContactType extends BaseType {
  @Field(type => NameType, { nullable: true })
  Name: NameType;

  @Field(type => AddressType, { nullable: true })
  Address: AddressType;

  @Field(type => EmailTypeEnum, { nullable: true })
  EmailType: EmailTypeEnum;

  @Field({ nullable: true })
  Email: string;

  @Field(type => PhoneTypeEnum, { nullable: true })
  PhoneType: PhoneTypeEnum;

  @Field({ nullable: true })
  Phone: string;

  @Field(type => PreferredContact, { nullable: true })
  Preferred: PreferredContact;

  @Field({ nullable: true })
  Subject: string;

  @Field({ nullable: true })
  Message: string;
}
