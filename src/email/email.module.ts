import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailResolver } from './email.resolver';
import { Email } from './email.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/admin.entity';
import { Reference } from '../reference/reference.entity';
import { AdminService } from '../admin/admin.service';
import { ReferenceService } from '../reference/reference.service';

@Module({
  imports: [TypeOrmModule.forFeature([Email, Admin, Reference])],
  providers: [EmailService, EmailResolver, AdminService, ReferenceService],
})
export class EmailModule {}
