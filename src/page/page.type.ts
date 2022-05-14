import { BaseType } from '../global/base';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('Page')
export class PageType extends BaseType {
  @Field({ nullable: true })
  Name: string;

  @Field({ nullable: true })
  Content: string;
}
