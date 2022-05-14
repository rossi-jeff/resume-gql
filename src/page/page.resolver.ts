import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { PageService } from './page.service';
import {
  LimitOffsetDeletedDTO,
  NameDto,
  CreatePageDto,
  UpdatePageDto,
} from '../global/dto';
import { PageType } from './page.type';

@Resolver('Page')
export class PageResolver {
  constructor(private pageService: PageService) {}

  @Query(returns => [PageType])
  async getPages(@Args() getPagesDto: LimitOffsetDeletedDTO) {
    return this.pageService.getPages(getPagesDto);
  }

  @Query(returns => PageType)
  async showPage(@Args() nameDto: NameDto) {
    return this.pageService.showPage(nameDto);
  }

  @Mutation(returns => PageType)
  async createPage(@Args() createPageDto: CreatePageDto) {
    return this.pageService.createPage(createPageDto);
  }

  @Mutation(returns => PageType)
  async updatePage(@Args() updatePageDto: UpdatePageDto) {
    return this.pageService.updatePage(updatePageDto);
  }

  @Mutation(returns => PageType)
  async deletePage(@Args() nameDto: NameDto) {
    return this.pageService.deletePage(nameDto);
  }
}
