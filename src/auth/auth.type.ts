import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Auth')
export class AuthType {
  @Field()
  Token: string;

  @Field()
  UUID: string;

  @Field()
  Class: string;
}
