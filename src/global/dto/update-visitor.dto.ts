import { ArgsType, Field } from '@nestjs/graphql';
import { NameInput, AddressInput, CredentialsInput } from '../input';
import { IsOptional } from 'class-validator';

@ArgsType()
export class UpdateVisitorDto {
  @Field()
  UUID: string;

  @IsOptional()
  @Field(type => NameInput, { nullable: true })
  Name: NameInput;

  @IsOptional()
  @Field(type => AddressInput, { nullable: true })
  Address: AddressInput;

  @IsOptional()
  @Field(type => CredentialsInput, { nullable: true })
  Credentials: CredentialsInput;

  @IsOptional()
  @Field({ nullable: true })
  Email: string;
}
