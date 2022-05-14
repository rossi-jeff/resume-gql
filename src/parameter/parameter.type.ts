import { ObjectType, Field } from '@nestjs/graphql';
import { BaseType } from '../global/base';
import { LinkType } from '../link/link.type';

@ObjectType('Parameter')
export class ParameterType extends BaseType {
  @Field({ nullable: true })
  Key: string;

  @Field({ nullable: true })
  Value: string;

  // @Field(type => [ LinkType ], { nullable: true })
  // Links: [ LinkType ]
}
