import { ArgsType, Field } from '@nestjs/graphql';
import { NameInput, CredentialsInput } from '../input';

@ArgsType()
export class CreateVisitorDto {
  @Field(type => NameInput, { nullable: true })
  Name: NameInput;

  @Field(type => CredentialsInput, { nullable: true })
  Credentials: CredentialsInput;

  @Field({ nullable: true })
  Email: string;
}
