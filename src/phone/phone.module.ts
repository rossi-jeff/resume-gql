import { Module } from '@nestjs/common';
import { PhoneService } from './phone.service';
import { PhoneResolver } from './phone.resolver';
import { Phone } from './phone.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from '../admin/admin.entity';
import { Reference } from '../reference/reference.entity';
import { AdminService } from '../admin/admin.service';
import { ReferenceService } from '../reference/reference.service';

@Module({
  imports: [TypeOrmModule.forFeature([Phone, Admin, Reference])],
  providers: [PhoneService, PhoneResolver, AdminService, ReferenceService],
})
export class PhoneModule {}
