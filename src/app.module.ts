import { Module } from '@nestjs/common';
import { ReferenceModule } from './reference/reference.module';
import { PhoneModule } from './phone/phone.module';
import { EmailModule } from './email/email.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { JobModule } from './job/job.module';
import { SchoolModule } from './school/school.module';
import { ParameterModule } from './parameter/parameter.module';
import { LinkModule } from './link/link.module';
import { CommentModule } from './comment/comment.module';
import { AdminModule } from './admin/admin.module';
import { VisitorModule } from './visitor/visitor.module';
import { FileModule } from './file/file.module';
import { PageModule } from './page/page.module';
import { ContactModule } from './contact/contact.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      playground: true,
      installSubscriptionHandlers: true,
    }),
    ReferenceModule,
    PhoneModule,
    EmailModule,
    JobModule,
    SchoolModule,
    ParameterModule,
    LinkModule,
    CommentModule,
    AdminModule,
    VisitorModule,
    FileModule,
    PageModule,
    ContactModule,
    AuthModule,
  ],
})
export class AppModule {}
