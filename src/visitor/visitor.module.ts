import { Module } from '@nestjs/common';
import { VisitorService } from './visitor.service';
import { VisitorResolver } from './visitor.resolver';
import { Visitor } from './visitor.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Visitor])],
  providers: [VisitorService, VisitorResolver],
})
export class VisitorModule {}
