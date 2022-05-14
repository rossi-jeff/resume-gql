import { registerEnumType } from '@nestjs/graphql';

export enum MonthEnum {
  January,
  February,
  March,
  April,
  May,
  June,
  July,
  August,
  September,
  October,
  November,
  December,
}
registerEnumType(MonthEnum, { name: 'Month' });
