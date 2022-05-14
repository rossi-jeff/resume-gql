import { ArgsType, Field } from '@nestjs/graphql';
import {
  NameInput,
  CredentialsInput,
  AddressInput,
  PhoneInput,
  EmailInput,
} from '../input';
import { IsOptional } from 'class-validator';

@ArgsType()
export class UpdateAdminDto {
  @Field()
  UUID: string;

  @IsOptional()
  @Field(type => NameInput, { nullable: true })
  Name: NameInput;

  @IsOptional()
  @Field(type => CredentialsInput, { nullable: true })
  Credentials: CredentialsInput;

  @IsOptional()
  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

  @IsOptional()
  @Field(type => [PhoneInput], { nullable: true })
  Phones: [PhoneInput];

  @IsOptional()
  @Field(type => [EmailInput], { nullable: true })
  Emails: [EmailInput];
}
