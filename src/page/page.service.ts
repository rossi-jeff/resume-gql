import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from './page.entity';
import { Repository } from 'typeorm';
import {
  NameDto,
  LimitOffsetDeletedDTO,
  CreatePageDto,
  UpdatePageDto,
} from '../global/dto';
import { NotFoundName } from '../global/error/not-found-name.error';
import { DefaultLimit } from '../global/constants';
import * as _ from 'lodash';

@Injectable()
export class PageService {
  private entity: any = Page;
  constructor(
    @InjectRepository(Page) private pageRepository: Repository<Page>,
  ) {}

  async getPages(getPagesDto: LimitOffsetDeletedDTO): Promise<Page[]> {
    const { Limit, Offset, IsDeleted } = getPagesDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
    };
    return this.pageRepository.find(options);
  }

  async showPage(nameDto: NameDto): Promise<Page> {
    const { Name } = nameDto;
    const found = await this.pageRepository.findOne(nameDto);
    if (!found) throw NotFoundName(this.entity, Name);
    return found;
  }

  async createPage(createPageDto: CreatePageDto): Promise<Page> {
    const page = new Page();
    _.merge(page, createPageDto);
    return this.pageRepository.save(page);
  }

  async updatePage(updatePageDto: UpdatePageDto): Promise<Page> {
    const { Name, Content } = updatePageDto;
    const page = await this.showPage({ Name });
    page.Content = Content;
    return this.pageRepository.save(page);
  }

  async deletePage(nameDto: NameDto): Promise<Page> {
    const page = await this.showPage(nameDto);
    page.IsDeleted = true;
    return this.pageRepository.save(page);
  }
}
