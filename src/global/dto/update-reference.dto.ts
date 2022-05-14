import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';
import { NameInput } from '../input/name.input';
import { AddressInput } from '../input/address.input';
import { PhoneInput } from '../input/phone.input';
import { EmailInput } from '../input/email.input';
import { CredentialsInput } from '../input';

@ArgsType()
export class UpdateReferenceDto {
  @Field()
  UUID: string;

  @IsOptional()
  @Field(type => NameInput, { nullable: true })
  Name: NameInput;

  @IsOptional()
  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

  @IsOptional()
  @Field({ nullable: true })
  Title: string;

  @IsOptional()
  @Field({ nullable: true })
  Company: string;

  @IsOptional()
  @Field(type => [PhoneInput], { nullable: true })
  Phones: [PhoneInput];

  @IsOptional()
  @Field(type => [EmailInput], { nullable: true })
  Emails: [EmailInput];

  @IsOptional()
  @Field(type => CredentialsInput, { nullable: true })
  Credentials: CredentialsInput;
}
