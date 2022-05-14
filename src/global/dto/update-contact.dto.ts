import { ArgsType, Field, Int } from '@nestjs/graphql';
import { EmailTypeEnum, PhoneTypeEnum, PreferredContact } from '../enum';
import { NameInput, AddressInput } from '../input';
import { IsInt, IsOptional } from 'class-validator';

@ArgsType()
export class UpdateContactDto {
  @IsInt()
  @Field(type => Int)
  Id: number;

  @Field(type => NameInput, { nullable: true })
  Name: NameInput;

  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

  @IsOptional()
  @Field(type => EmailTypeEnum, { nullable: true })
  EmailType: EmailTypeEnum;

  @IsOptional()
  @Field({ nullable: true })
  Email: string;

  @IsOptional()
  @Field(type => PhoneTypeEnum, { nullable: true })
  PhoneType: PhoneTypeEnum;

  @IsOptional()
  @Field({ nullable: true })
  Phone: string;

  @IsOptional()
  @Field(type => PreferredContact, { nullable: true })
  Preferred: PreferredContact;

  @IsOptional()
  @Field({ nullable: true })
  Subject: string;

  @IsOptional()
  @Field({ nullable: true })
  Message: string;
}
