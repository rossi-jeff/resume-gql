import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CredentialsInput {
  @Field({ nullable: true })
  Username: string;

  @Field({ nullable: true })
  Password: string;
}
