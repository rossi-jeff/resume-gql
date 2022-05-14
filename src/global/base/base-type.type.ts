import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class BaseType {
  @Field(type => Int)
  Id: number;

  @Field({ nullable: true })
  Created: string;

  @Field({ nullable: true })
  Updated: string;

  @Field(type => Int, { nullable: true })
  Version: number;

  @Field({ nullable: true })
  IsDeleted: boolean;
}
