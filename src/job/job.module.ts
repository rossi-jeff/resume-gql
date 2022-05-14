import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { Job } from './job.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobResolver } from './job.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Job])],
  providers: [JobService, JobResolver],
})
export class JobModule {}
