import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { PhoneService } from './phone.service';
import { PhoneType } from './phone.type';
import {
  LimitOffsetDeletedDTO,
  CreatePhoneDto,
  IdDto,
  UpdatePhoneDto,
} from '../global/dto';

@Resolver('Phone')
export class PhoneResolver {
  constructor(private phoneService: PhoneService) {}

  @Query(returns => [PhoneType])
  async getPhones(@Args() getPhonesDTO: LimitOffsetDeletedDTO) {
    return this.phoneService.getPhones(getPhonesDTO);
  }

  @Query(returns => PhoneType)
  async showPhone(@Args() idDto: IdDto) {
    return this.phoneService.showPhone(idDto);
  }

  @Mutation(returns => PhoneType)
  async createPhone(@Args() createPhoneDto: CreatePhoneDto) {
    return this.phoneService.createPhone(createPhoneDto);
  }

  @Mutation(returns => PhoneType)
  async updatePhone(@Args() updatePhoneDto: UpdatePhoneDto) {
    return this.phoneService.updatePhone(updatePhoneDto);
  }

  @Mutation(returns => Boolean)
  async deletePhone(@Args() idDto: IdDto) {
    return this.phoneService.deletePhone(idDto);
  }
}
