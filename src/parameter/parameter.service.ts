import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Parameter } from './parameter.entity';
import { Repository } from 'typeorm';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreateParameterDto,
  UpdateParameterDto,
} from '../global/dto';
import { DefaultLimit } from '../global/constants';
import { NotFound } from '../global/error';
import * as _ from 'lodash';

@Injectable()
export class ParameterService {
  private entity: any = Parameter;
  constructor(
    @InjectRepository(Parameter)
    private parameterRepository: Repository<Parameter>,
  ) {}

  async getParameters(
    getParametersDto: LimitOffsetDeletedDTO,
  ): Promise<Parameter[]> {
    const { Limit, Offset, IsDeleted } = getParametersDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
    };
    return this.parameterRepository.find(options);
  }

  async showParameter(idDto: IdDto): Promise<Parameter> {
    const { Id } = idDto;
    const found = await this.parameterRepository.findOne(Id);
    if (!found) throw NotFound(this.entity, Id);
    return found;
  }

  async createParameter(
    createParameterDto: CreateParameterDto,
  ): Promise<Parameter> {
    const parameter = new Parameter();
    _.merge(parameter, createParameterDto);
    return this.parameterRepository.save(parameter);
  }

  async updateParameter(
    updateParameterDto: UpdateParameterDto,
  ): Promise<Parameter> {
    const { Id, ...updates } = updateParameterDto;
    const parameter = await this.showParameter({ Id });
    if (!_.isEmpty(updates)) _.merge(parameter, updates);
    return this.parameterRepository.save(parameter);
  }

  async deleteParameter(idDto: IdDto): Promise<Parameter> {
    const parameter = await this.showParameter(idDto);
    return this.parameterRepository.remove(parameter);
  }
}
