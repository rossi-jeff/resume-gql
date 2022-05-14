import { ArgsType, Field } from '@nestjs/graphql';
import {
  NameInput,
  CredentialsInput,
  AddressInput,
  PhoneInput,
  EmailInput,
} from '../input';

@ArgsType()
export class CreateAdminDto {
  @Field(type => NameInput, { nullable: true })
  Name: NameInput;

  @Field(type => CredentialsInput, { nullable: true })
  Credentials: CredentialsInput;

  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

  @Field(type => [PhoneInput], { nullable: true })
  Phones: [PhoneInput];

  @Field(type => [EmailInput], { nullable: true })
  Emails: [EmailInput];
}
