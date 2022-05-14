import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { SchoolService } from './school.service';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreateSchoolDto,
  UpdateSchoolDto,
} from '../global/dto';
import { SchoolType } from './school.type';

@Resolver('School')
export class SchoolResolver {
  constructor(private schoolService: SchoolService) {}

  @Query(returns => [SchoolType])
  async getSchools(@Args() getSchoolsDto: LimitOffsetDeletedDTO) {
    return this.schoolService.getSchools(getSchoolsDto);
  }

  @Query(returns => SchoolType)
  async showSchool(@Args() idDto: IdDto) {
    return this.schoolService.showSchool(idDto);
  }

  @Mutation(returns => SchoolType)
  async createSchool(@Args() createSchoolDto: CreateSchoolDto) {
    return this.schoolService.createSchool(createSchoolDto);
  }

  @Mutation(returns => SchoolType)
  async updateSchool(@Args() updateSchoolDto: UpdateSchoolDto) {
    return this.schoolService.updateSchool(updateSchoolDto);
  }

  @Mutation(returns => SchoolType)
  async deleteSchool(@Args() idDto: IdDto) {
    return this.schoolService.deleteSchool(idDto);
  }
}
