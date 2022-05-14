import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Visitor } from './visitor.entity';
import { Repository } from 'typeorm';
import {
  LimitOffsetDeletedDTO,
  CreateVisitorDto,
  UpdateVisitorDto,
  UuidDto,
} from '../global/dto';
import { DefaultLimit } from '../global/constants';
import { NotFoundUUID } from '../global/error';
import * as _ from 'lodash';

@Injectable()
export class VisitorService {
  private entity: any = Visitor;
  constructor(
    @InjectRepository(Visitor)
    private visitorRepository: Repository<Visitor>,
  ) {}

  async getVisitors(getVisitorsDto: LimitOffsetDeletedDTO): Promise<Visitor[]> {
    const { Limit, Offset, IsDeleted } = getVisitorsDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
    };
    return this.visitorRepository.find(options);
  }

  async showVisitor(uuidDto: UuidDto): Promise<Visitor> {
    const { UUID } = uuidDto;
    const found = await this.visitorRepository.findOne({ UUID });
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createVisitor(createVisitorDto: CreateVisitorDto): Promise<Visitor> {
    const visitor = new Visitor();
    _.merge(visitor, createVisitorDto);
    if (_.has(createVisitorDto, 'Credentials.Password')) {
      visitor.setEncryptedPassword(
        _.get(createVisitorDto, 'Credentials.Password'),
      );
    }
    return this.visitorRepository.save(visitor);
  }

  async updateVisitor(updateVisitorDto: UpdateVisitorDto): Promise<Visitor> {
    const { UUID, ...updates } = updateVisitorDto;
    const visitor = await this.showVisitor({ UUID });
    if (!_.isEmpty(updates)) _.merge(visitor, updates);
    if (_.has(updateVisitorDto, 'Credentials.Password')) {
      visitor.setEncryptedPassword(
        _.get(updateVisitorDto, 'Credentials.Password'),
      );
    }
    return this.visitorRepository.save(visitor);
  }

  async deleteVisitor(uuidDto: UuidDto): Promise<Visitor> {
    const visitor = await this.showVisitor(uuidDto);
    visitor.IsDeleted = true;
    return this.visitorRepository.save(visitor);
  }

  async getVisitorByUsername(Username: string): Promise<Visitor> {
    return this.visitorRepository.findOne({ Credentials: { Username } });
  }
}
