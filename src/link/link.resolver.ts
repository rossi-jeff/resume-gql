import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { LinkService } from './link.service';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreateLinkDto,
  UpdateLinkDto,
} from '../global/dto';
import { LinkType } from './link.type';

@Resolver('Link')
export class LinkResolver {
  constructor(private linkService: LinkService) {}

  @Query(returns => [LinkType])
  async getLinks(@Args() getLinksDto: LimitOffsetDeletedDTO) {
    return this.linkService.getLinks(getLinksDto);
  }

  @Query(returns => LinkType)
  async showLink(@Args() idDto: IdDto) {
    return this.linkService.showLink(idDto);
  }

  @Mutation(returns => LinkType)
  async createLink(@Args() createLinkDto: CreateLinkDto) {
    return this.linkService.createLink(createLinkDto);
  }

  @Mutation(returns => LinkType)
  async updateLink(@Args() updateLinkDto: UpdateLinkDto) {
    return this.linkService.updateLink(updateLinkDto);
  }

  @Mutation(returns => LinkType)
  async deleteLink(@Args() idDto: IdDto) {
    return this.linkService.deleteLink(idDto);
  }
}
