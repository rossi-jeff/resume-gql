import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { JobService } from './job.service';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreateJobDto,
  UpdateJobDto,
} from '../global/dto';
import { JobType } from './job.type';

@Resolver('Job')
export class JobResolver {
  constructor(private jobService: JobService) {}

  @Query(returns => [JobType])
  async getJobs(@Args() getJobsDto: LimitOffsetDeletedDTO) {
    return this.jobService.getJobs(getJobsDto);
  }

  @Query(returns => JobType)
  async showJob(@Args() idDto: IdDto) {
    return this.jobService.showJob(idDto);
  }

  @Mutation(returns => JobType)
  async createJob(@Args() createJobDto: CreateJobDto) {
    return this.jobService.createJob(createJobDto);
  }

  @Mutation(returns => JobType)
  async updateJob(@Args() updateJobDto: UpdateJobDto) {
    return this.jobService.updateJob(updateJobDto);
  }

  @Mutation(returns => JobType)
  async deleteJob(@Args() idDto: IdDto) {
    return this.jobService.deleteJob(idDto);
  }
}
