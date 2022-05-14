import { registerEnumType } from '@nestjs/graphql';

export enum ConversationSource {
  Angular,
  Vue,
  React,
}
registerEnumType(ConversationSource, { name: 'ConversationSource' });
