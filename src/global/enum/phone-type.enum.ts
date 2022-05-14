import { registerEnumType } from '@nestjs/graphql';

export enum PhoneTypeEnum {
  Work,
  Mobile,
  Home,
}
registerEnumType(PhoneTypeEnum, { name: 'PhoneType' });
