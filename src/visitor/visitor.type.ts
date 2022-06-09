import { UserType } from '../global/base';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType('Visitor')
export class VisitorType extends UserType {
  @Field({ nullable: true })
  Email?: string;

  @Field({ nullable: true })
  Approved?: boolean;
}
