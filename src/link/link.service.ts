import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Link } from './link.entity';
import { Repository } from 'typeorm';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreateLinkDto,
  UpdateLinkDto,
} from '../global/dto';
import { DefaultLimit } from '../global/constants';
import { NotFound } from '../global/error';
import * as _ from 'lodash';

@Injectable()
export class LinkService {
  private entity: any = Link;
  constructor(
    @InjectRepository(Link) private linkRepository: Repository<Link>,
  ) {}

  async getLinks(getLinksDto: LimitOffsetDeletedDTO): Promise<Link[]> {
    const { Limit, Offset, IsDeleted } = getLinksDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
      order: {
        Type: 'DESC',
        Title: 'ASC',
      },
    };
    return this.linkRepository.find(options);
  }

  async showLink(idDto: IdDto): Promise<Link> {
    const { Id } = idDto;
    const found = await this.linkRepository.findOne(Id);
    if (!found) throw NotFound(this.entity, Id);
    return found;
  }

  async createLink(createLinkDto: CreateLinkDto): Promise<Link> {
    const link = new Link();
    _.merge(link, createLinkDto);
    return this.linkRepository.save(link);
  }

  async updateLink(updateLinkDto: UpdateLinkDto): Promise<Link> {
    const { Id, ...updates } = updateLinkDto;
    const link = await this.showLink({ Id });
    if (!_.isEmpty(updates)) _.merge(link, updates);
    return this.linkRepository.save(link);
  }

  async deleteLink(idDto: IdDto): Promise<Link> {
    const link = await this.showLink(idDto);
    link.IsDeleted = true;
    return this.linkRepository.save(link);
  }
}
