import { registerEnumType } from '@nestjs/graphql';

export enum PreferredContact {
  Phone,
  Email,
}
registerEnumType(PreferredContact, { name: 'PreferredContact' });
