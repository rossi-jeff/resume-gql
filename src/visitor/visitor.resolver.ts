import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { VisitorService } from './visitor.service';
import {
  LimitOffsetDeletedDTO,
  CreateVisitorDto,
  UpdateVisitorDto,
  UuidDto,
} from '../global/dto';
import { VisitorType } from './visitor.type';

@Resolver('Visitor')
export class VisitorResolver {
  constructor(private visitorService: VisitorService) {}

  @Query(returns => [VisitorType])
  async getVisitors(@Args() getVisitorsDto: LimitOffsetDeletedDTO) {
    return this.visitorService.getVisitors(getVisitorsDto);
  }

  @Query(returns => VisitorType)
  async showVisitor(@Args() uuidDto: UuidDto) {
    return this.visitorService.showVisitor(uuidDto);
  }

  @Mutation(returns => VisitorType)
  async createVisitor(@Args() createVisitorDto: CreateVisitorDto) {
    return this.visitorService.createVisitor(createVisitorDto);
  }

  @Mutation(returns => VisitorType)
  async updateVisitor(@Args() updateVisitorDto: UpdateVisitorDto) {
    return this.visitorService.updateVisitor(updateVisitorDto);
  }

  @Mutation(returns => VisitorType)
  async deleteVisitor(@Args() uuidDto: UuidDto) {
    return this.visitorService.deleteVisitor(uuidDto);
  }
}
