import { registerEnumType } from '@nestjs/graphql';

export enum Salutation {
  Mr,
  Mrs,
  Miss,
  Ms,
  Dr,
}
registerEnumType(Salutation, { name: 'Salutation' });
