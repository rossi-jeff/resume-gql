import { registerEnumType } from '@nestjs/graphql';

export enum CommentTypeEnum {
  Recommendation,
  Testimonial,
  Criticism,
  Notification,
  General,
}
registerEnumType(CommentTypeEnum, { name: 'CommentType' });
