import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Email } from './email.entity';
import { Repository } from 'typeorm';
import {
  IdDto,
  LimitOffsetDeletedDTO,
  CreateEmailDto,
  UpdateEmailDto,
} from '../global/dto';
import { NotFound } from '../global/error';
import * as _ from 'lodash';
import { DefaultLimit } from '../global/constants';
import { AdminService } from '../admin/admin.service';
import { ReferenceService } from '../reference/reference.service';

@Injectable()
export class EmailService {
  private entity: any = Email;

  constructor(
    @InjectRepository(Email) private emailRepository: Repository<Email>,
    private adminService: AdminService,
    private referenceService: ReferenceService,
  ) {}

  async getEmails(getEmailsDto: LimitOffsetDeletedDTO): Promise<Email[]> {
    const { Limit, Offset, IsDeleted } = getEmailsDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
    };
    return this.emailRepository.find(options);
  }

  async showEmail(idDto: IdDto): Promise<Email> {
    const { Id } = idDto;
    const found = await this.emailRepository.findOne(Id);
    if (!found) throw NotFound(this.entity, Id);
    return found;
  }

  async createEmail(createEmailDto: CreateEmailDto): Promise<Email> {
    const { Type, Address, AdminUUID, ReferenceUUID } = createEmailDto;
    let parent: any, manager: any;
    const email = new Email();
    _.merge(email, { Type, Address });
    await this.emailRepository.save(email);
    try {
      if (AdminUUID || ReferenceUUID) {
        manager = this.emailRepository.manager;
        if (AdminUUID) {
          parent = await this.adminService.showAdmin({ UUID: AdminUUID });
          await manager.query(
            'INSERT INTO admin_email (emailId, adminId) VALUES (?,?)',
            [email.Id, parent.Id],
          );
        }
        if (ReferenceUUID) {
          parent = await this.referenceService.showReference({
            UUID: ReferenceUUID,
          });
          await manager.query(
            'INSERT INTO reference_email (emailId, referenceId) VALUES (?,?)',
            [email.Id, parent.Id],
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
    return email;
  }

  async updateEmail(updateEmailDto: UpdateEmailDto): Promise<Email> {
    const { Id, ...updates } = updateEmailDto;
    const email = await this.showEmail({ Id });
    if (!_.isEmpty(updates)) _.merge(email, updates);
    return this.emailRepository.save(email);
  }

  async deleteEmail(idDto: IdDto): Promise<boolean> {
    const email = await this.showEmail(idDto);
    await this.emailRepository.remove(email);
    return email.Id === null;
  }
}
