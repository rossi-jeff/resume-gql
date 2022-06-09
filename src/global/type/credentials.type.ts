import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Credentials')
export class CredentialsType {
  @Field({ nullable: true })
  Username?: string;
}
