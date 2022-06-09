import { Field, ObjectType } from '@nestjs/graphql';
import { Salutation } from '../enum';

@ObjectType('Name')
export class NameType {
  @Field(type => Salutation, { nullable: true })
  Salutation?: Salutation;

  @Field({ nullable: true })
  First?: string;

  @Field({ nullable: true })
  Middle?: string;

  @Field({ nullable: true })
  Last?: string;

  @Field({ nullable: true })
  Suffix?: string;
}
