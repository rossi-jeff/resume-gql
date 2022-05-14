import { ArgsType, Field } from '@nestjs/graphql';
import { EmailTypeEnum, PhoneTypeEnum, PreferredContact } from '../enum';
import { NameInput, AddressInput } from '../input';

@ArgsType()
export class CreateContactDto {
  @Field(type => NameInput, { nullable: true })
  Name: NameInput;

  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

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
