import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AdminService } from '../admin/admin.service';
import { ReferenceService } from '../reference/reference.service';
import { VisitorService } from '../visitor/visitor.service';
import { Admin } from '../admin/admin.entity';
import { Reference } from '../reference/reference.entity';
import { Visitor } from '../visitor/visitor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthResolver } from './auth.resolver';
import * as fs from 'fs';
import * as path from 'path';

const publicKey = fs.readFileSync(
  path.join(__dirname, '../../keys/jwt-key.pub'),
);
const privateKey = fs.readFileSync(path.join(__dirname, '../../keys/jwt-key'));

@Module({
  imports: [
    TypeOrmModule.forFeature([Admin, Reference, Visitor]),
    JwtModule.register({ publicKey, privateKey }),
  ],
  providers: [
    AuthService,
    AdminService,
    ReferenceService,
    VisitorService,
    AuthResolver,
  ],
})
export class AuthModule {}
