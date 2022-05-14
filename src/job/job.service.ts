import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Job } from './job.entity';
import { Repository } from 'typeorm';
import {
  IdDto,
  LimitOffsetDeletedDTO,
  CreateJobDto,
  UpdateJobDto,
} from '../global/dto';
import { DefaultLimit } from '../global/constants';
import { NotFound } from '../global/error';
import * as _ from 'lodash';

@Injectable()
export class JobService {
  private entity: any = Job;
  constructor(@InjectRepository(Job) private jobRepositiory: Repository<Job>) {}

  async getJobs(getJobsDto: LimitOffsetDeletedDTO): Promise<Job[]> {
    const { Limit, Offset, IsDeleted } = getJobsDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
    };
    return this.jobRepositiory.find(options);
  }

  async showJob(idDto: IdDto): Promise<Job> {
    const { Id } = idDto;
    const found = await this.jobRepositiory.findOne(Id);
    if (!found) throw NotFound(this.entity, Id);
    return found;
  }

  async createJob(createJobDto: CreateJobDto): Promise<Job> {
    const job = new Job();
    _.merge(job, createJobDto);
    return this.jobRepositiory.save(job);
  }

  async updateJob(updateJobDto: UpdateJobDto): Promise<Job> {
    const { Id, ...updates } = updateJobDto;
    const job = await this.showJob({ Id });
    if (!_.isEmpty(updates)) _.merge(job, updates);
    return this.jobRepositiory.save(job);
  }

  async deleteJob(idDto: IdDto): Promise<Job> {
    const job = await this.showJob(idDto);
    job.IsDeleted = true;
    return this.jobRepositiory.save(job);
  }
}
