import { ArgsType, Field } from '@nestjs/graphql';
import { NameInput } from '../input/name.input';
import { AddressInput } from '../input/address.input';
import { EmailInput, PhoneInput, CredentialsInput } from '../input';

@ArgsType()
export class CreateReferenceDto {
  @Field(type => NameInput, { nullable: true })
  Name: NameInput;

  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

  @Field({ nullable: true })
  Title: string;

  @Field({ nullable: true })
  Company: string;

  @Field(type => [PhoneInput], { nullable: true })
  Phones: [PhoneInput];

  @Field(type => [EmailInput], { nullable: true })
  Emails: [EmailInput];

  @Field(type => CredentialsInput, { nullable: true })
  Credentials: CredentialsInput;
}
