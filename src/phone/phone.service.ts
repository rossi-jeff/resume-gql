import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Phone } from './phone.entity';
import { Repository } from 'typeorm';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreatePhoneDto,
  UpdatePhoneDto,
} from '../global/dto';
import { NotFound } from '../global/error';
import * as _ from 'lodash';
import { DefaultLimit } from '../global/constants';
import { AdminService } from '../admin/admin.service';
import { ReferenceService } from '../reference/reference.service';

@Injectable()
export class PhoneService {
  private entity: any = Phone;
  constructor(
    @InjectRepository(Phone) private phoneRepository: Repository<Phone>,
    private adminService: AdminService,
    private referenceService: ReferenceService,
  ) {}

  async getPhones(getPhonesDTO: LimitOffsetDeletedDTO): Promise<Phone[]> {
    const { Limit, Offset, IsDeleted } = getPhonesDTO;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
    };
    return this.phoneRepository.find(options);
  }

  async showPhone(idDto: IdDto): Promise<Phone> {
    const { Id } = idDto;
    const found = await this.phoneRepository.findOne(Id);
    if (!found) throw NotFound(this.entity, Id);
    return found;
  }

  async createPhone(createPhoneDto: CreatePhoneDto): Promise<Phone> {
    const {
      Number,
      Type,
      Extension,
      AdminUUID,
      ReferenceUUID,
    } = createPhoneDto;
    let parent: any, manager: any;
    const phone = new Phone();
    _.merge(phone, { Number, Type, Extension });
    await this.phoneRepository.save(phone);
    try {
      if (AdminUUID || ReferenceUUID) {
        manager = this.phoneRepository.manager;
        if (AdminUUID) {
          parent = await this.adminService.showAdmin({ UUID: AdminUUID });
          await manager.query(
            'INSERT INTO admin_phone (phoneId, adminId) VALUES (?,?)',
            [phone.Id, parent.Id],
          );
        }
        if (ReferenceUUID) {
          parent = await this.referenceService.showReference({
            UUID: ReferenceUUID,
          });
          await manager.query(
            'INSERT INTO reference_phone (phoneId, referenceId) VALUES (?,?)',
            [phone.Id, parent.Id],
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
    return phone;
  }

  async updatePhone(updatePhoneDto: UpdatePhoneDto): Promise<Phone> {
    const { Id, ...updates } = updatePhoneDto;
    const phone = await this.showPhone({ Id });
    if (!_.isEmpty(updates)) _.merge(phone, updates);
    return this.phoneRepository.save(phone);
  }

  async deletePhone(idDto: IdDto): Promise<boolean> {
    const phone = await this.showPhone(idDto);
    await this.phoneRepository.remove(phone);
    return phone.Id === null;
  }
}
