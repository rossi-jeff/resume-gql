import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Admin } from './admin.entity';
import { Repository } from 'typeorm';
import { UuidDto, CreateAdminDto, UpdateAdminDto } from '../global/dto';
import { NotFoundUUID } from '../global/error';
import * as _ from 'lodash';

@Injectable()
export class AdminService {
  private entity: any = Admin;
  private relations: string[] = ['Phones', 'Emails', 'Comments'];
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>,
  ) {}

  async showAdmin(uuidDto: UuidDto): Promise<Admin> {
    const { UUID } = uuidDto;
    const found = await this.adminRepository.findOne(
      { UUID },
      { relations: this.relations },
    );
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<Admin> {
    const admin = new Admin();
    _.merge(admin, createAdminDto);
    if (_.has(createAdminDto, 'Credentials.Password')) {
      admin.setEncryptedPassword(_.get(createAdminDto, 'Credentials.Password'));
    }
    return this.adminRepository.save(admin);
  }

  async updateAdmin(updateAdminDto: UpdateAdminDto): Promise<Admin> {
    const { UUID, ...updates } = updateAdminDto;
    const admin = await this.showAdmin({ UUID });
    if (!_.isEmpty(updates)) _.merge(admin, updates);
    if (_.has(updateAdminDto, 'Credentials.Password')) {
      admin.setEncryptedPassword(_.get(updateAdminDto, 'Credentials.Password'));
    }
    return this.adminRepository.save(admin);
  }

  async deleteAdmin(uuidDto: UuidDto): Promise<Admin> {
    const admin = await this.showAdmin(uuidDto);
    admin.IsDeleted = true;
    return this.adminRepository.save(admin);
  }

  async getAdminByUsername(Username: string): Promise<Admin> {
    return this.adminRepository.findOne({ Credentials: { Username } });
  }
}
