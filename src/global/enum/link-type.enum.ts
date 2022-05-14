import { registerEnumType } from '@nestjs/graphql';

export enum LinkTypeEnum {
  Resource,
  Sample,
  Project,
}
registerEnumType(LinkTypeEnum, { name: 'LinkType' });
