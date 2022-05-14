import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CredentialsDto {
  @Field({ nullable: true })
  Username: string;

  @Field({ nullable: true })
  Password: string;
}
