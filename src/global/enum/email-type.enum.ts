import { registerEnumType } from '@nestjs/graphql';

export enum EmailTypeEnum {
  Work,
  Home,
}
registerEnumType(EmailTypeEnum, { name: 'EmailType' });
