import { BaseType } from './base-type.type';
import { Field, ObjectType } from '@nestjs/graphql';
import { NameType, CredentialsType } from '../type';

@ObjectType()
export class UserType extends BaseType {
  @Field(type => NameType, { nullable: true })
  Name?: NameType;

  @Field(type => CredentialsType, { nullable: true })
  Credentials?: CredentialsType;

  @Field({ nullable: true })
  UUID?: string;
}
