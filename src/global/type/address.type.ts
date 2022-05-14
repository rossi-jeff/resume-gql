import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Address')
export class AddressType {
  @Field({ nullable: true })
  Address: string;

  @Field({ nullable: true })
  Suite: string;

  @Field({ nullable: true })
  City: string;

  @Field({ nullable: true })
  State: string;

  @Field({ nullable: true })
  Zip: string;
}
