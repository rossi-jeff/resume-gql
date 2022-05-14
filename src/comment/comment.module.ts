import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { CommentResolver } from './comment.resolver';
import { AdminService } from '../admin/admin.service';
import { ReferenceService } from '../reference/reference.service';
import { VisitorService } from '../visitor/visitor.service';
import { Admin } from '../admin/admin.entity';
import { Reference } from '../reference/reference.entity';
import { Visitor } from '../visitor/visitor.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Admin, Reference, Visitor])],
  providers: [
    CommentService,
    CommentResolver,
    AdminService,
    ReferenceService,
    VisitorService,
  ],
})
export class CommentModule {}
