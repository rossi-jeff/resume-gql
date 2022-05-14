import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { ParameterService } from './parameter.service';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreateParameterDto,
  UpdateParameterDto,
} from '../global/dto';
import { ParameterType } from './parameter.type';

@Resolver('Parameter')
export class ParameterResolver {
  constructor(private parameterService: ParameterService) {}

  @Query(returns => [ParameterType])
  async getParameters(@Args() getParametersDto: LimitOffsetDeletedDTO) {
    return this.parameterService.getParameters(getParametersDto);
  }

  @Query(returns => ParameterType)
  async showParameter(@Args() idDto: IdDto) {
    return this.parameterService.showParameter(idDto);
  }

  @Mutation(returns => ParameterType)
  async createParameter(@Args() createParameterDto: CreateParameterDto) {
    return this.parameterService.createParameter(createParameterDto);
  }

  @Mutation(returns => ParameterType)
  async updateParameter(@Args() updateParameterDto: UpdateParameterDto) {
    return this.parameterService.updateParameter(updateParameterDto);
  }

  @Mutation(returns => ParameterType)
  async deleteParameter(@Args() idDto: IdDto) {
    return this.parameterService.deleteParameter(idDto);
  }
}
