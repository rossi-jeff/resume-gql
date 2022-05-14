import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { ReferenceService } from './reference.service';
import { ReferenceType } from './reference.type';
import {
  CreateReferenceDto,
  UpdateReferenceDto,
  UuidDto,
  LimitOffsetDeletedApprovedDTO,
  ApproveReferenceDto,
} from '../global/dto';

@Resolver('Reference')
export class ReferenceResolver {
  constructor(private referenceService: ReferenceService) {}

  @Query(returns => [ReferenceType])
  async getReferences(@Args() getReferencesDto: LimitOffsetDeletedApprovedDTO) {
    return this.referenceService.getReferences(getReferencesDto);
  }

  @Query(returns => ReferenceType)
  async showReference(@Args() uuidDto: UuidDto) {
    return this.referenceService.showReference(uuidDto);
  }

  @Mutation(returns => ReferenceType)
  async createReference(@Args() createReferenceDto: CreateReferenceDto) {
    return this.referenceService.createReference(createReferenceDto);
  }

  @Mutation(returns => ReferenceType)
  async updateReference(@Args() updateReferenceDto: UpdateReferenceDto) {
    return this.referenceService.updateReference(updateReferenceDto);
  }

  @Mutation(returns => ReferenceType)
  async deleteReference(@Args() uuidDto: UuidDto) {
    return this.referenceService.deleteReference(uuidDto);
  }

  @Mutation(returns => ReferenceType)
  async approveReference(@Args() approveReferenceDto: ApproveReferenceDto) {
    return this.referenceService.approveReference(approveReferenceDto);
  }
}
