import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Reference } from './reference.entity';
import { Repository } from 'typeorm';
import {
  CreateReferenceDto,
  UpdateReferenceDto,
  UuidDto,
  LimitOffsetDeletedApprovedDTO,
  ApproveReferenceDto,
} from '../global/dto';
import { NotFoundUUID } from '../global/error';
import * as _ from 'lodash';
import { DefaultLimit, EmailJsUrl } from '../global/constants';
import { EmailJsMessage } from '../global/type';
import { FormattedName } from '../utils/formatted-name';
import { FormattedAddress } from '../utils/formatted-address';
import fetch from 'node-fetch';

@Injectable()
export class ReferenceService {
  private entity: any = Reference;
  private relations: string[] = ['Phones', 'Emails', 'Comments'];
  // private mailer: any = new SendGridMailer();

  constructor(
    @InjectRepository(Reference)
    private referenceRepository: Repository<Reference>,
  ) {}

  async getReferences(
    getReferencesDto: LimitOffsetDeletedApprovedDTO,
  ): Promise<Reference[]> {
    const { Limit, Offset, IsDeleted, Approved } = getReferencesDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
        Approved: _.has(getReferencesDto, 'Approved') ? Approved : true,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
      relations: this.relations,
    };
    return this.referenceRepository.find(options);
  }

  async showReference(uuidDto: UuidDto): Promise<Reference> {
    const { UUID } = uuidDto;
    const found = await this.referenceRepository.findOne(
      { UUID },
      { relations: this.relations },
    );
    if (!found) throw NotFoundUUID(this.entity, UUID);
    return found;
  }

  async createReference(
    createReferenceDto: CreateReferenceDto,
  ): Promise<Reference> {
    const reference = new Reference();
    _.merge(reference, createReferenceDto);
    if (_.has(createReferenceDto, 'Credentials.Password')) {
      reference.setEncryptedPassword(
        _.get(createReferenceDto, 'Credentials.Password'),
      );
    }
    try {
			const message = this.buildMessage(reference, 'Create');
			const response = await fetch(EmailJsUrl, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    return this.referenceRepository.save(reference);
  }

  async updateReference(
    updateReferenceDto: UpdateReferenceDto,
  ): Promise<Reference> {
    const { UUID, ...updates } = updateReferenceDto;
    const reference = await this.showReference({ UUID });
    if (!_.isEmpty(updates)) _.merge(reference, updates);
    if (_.has(updateReferenceDto, 'Credentials.Password')) {
      reference.setEncryptedPassword(
        _.get(updateReferenceDto, 'Credentials.Password'),
      );
    }
    try {
			const message = this.buildMessage(reference, 'Update');
      const response = await fetch(EmailJsUrl, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    return this.referenceRepository.save(reference);
  }

  async deleteReference(uuidDto: UuidDto): Promise<Reference> {
    const reference = await this.showReference(uuidDto);
    reference.IsDeleted = true;
    return this.referenceRepository.save(reference);
  }

  async getReferenceByUsername(Username: string): Promise<Reference> {
    return this.referenceRepository.findOne({ Credentials: { Username } });
  }

  async approveReference(
    approveReferenceDto: ApproveReferenceDto,
  ): Promise<Reference> {
    const { UUID, Approved } = approveReferenceDto;
    const reference = await this.showReference({ UUID });
    reference.Approved = Approved;
    return this.referenceRepository.save(reference);
  }

  private buildMessage(reference: Reference, action: string) {
    const message = new EmailJsMessage();
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.service_id = process.env.EMAIL_JS_SERVICE_ID;
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.template_id = process.env.EMAIL_JS_CONTACT_TEMPLATE_ID;
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.user_id = process.env.EMAIL_JS_USER_ID;
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.template_params = {};
		message.template_params['Action'] = `${action} Reference`;
		message.template_params['Name'] = FormattedName(reference.Name);
    message.template_params['Address'] = FormattedAddress(reference.Address);
		message.template_params['Title'] = reference.Title;
		message.template_params['Company'] = reference.Company;
    return message;
  }
}
