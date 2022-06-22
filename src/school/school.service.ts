import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { School } from './school.entity';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreateSchoolDto,
  UpdateSchoolDto,
} from '../global/dto';
import { DefaultLimit } from '../global/constants';
import { NotFound } from '../global/error';
import * as _ from 'lodash';

@Injectable()
export class SchoolService {
  private entity: any = School;
  constructor(
    @InjectRepository(School) private schoolRepository: Repository<School>,
  ) {}

  async getSchools(getSchoolsDto: LimitOffsetDeletedDTO): Promise<School[]> {
    const { Limit, Offset, IsDeleted } = getSchoolsDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
      },
      order: {
        'From.Year': 'DESC'
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
    };
    return this.schoolRepository.find(options);
  }

  async showSchool(idDto: IdDto): Promise<School> {
    const { Id } = idDto;
    const found = await this.schoolRepository.findOne(Id);
    if (!found) throw NotFound(this.entity, Id);
    return found;
  }

  async createSchool(createSchoolDto: CreateSchoolDto): Promise<School> {
    const school = new School();
    _.merge(school, createSchoolDto);
    return this.schoolRepository.save(school);
  }

  async updateSchool(updateSchoolDto: UpdateSchoolDto): Promise<School> {
    const { Id, ...updates } = updateSchoolDto;
    const school = await this.showSchool({ Id });
    if (!_.isEmpty(updates)) _.merge(school, updates);
    return this.schoolRepository.save(school);
  }

  async deleteSchool(idDto: IdDto): Promise<School> {
    const school = await this.showSchool(idDto);
    school.IsDeleted = true;
    return this.schoolRepository.save(school);
  }
}
