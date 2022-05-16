import { Injectable } from '@nestjs/common';
import { Contact } from './contact.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreateContactDto,
  UpdateContactDto,
} from '../global/dto';
import { DefaultLimit, EmailJsUrl } from '../global/constants';
import { NotFound } from '../global/error';
import * as _ from 'lodash';
import { EmailJsMessage } from '../global/type';
import { FormattedName } from '../utils/formatted-name';
import { FormattedAddress } from '../utils/formatted-address';
import fetch from 'node-fetch';

@Injectable()
export class ContactService {
  private entity: any = Contact;
  constructor(
    @InjectRepository(Contact) private contactRepository: Repository<Contact>,
  ) {}

  async getContacts(getContactsDto: LimitOffsetDeletedDTO): Promise<Contact[]> {
    const { Limit, Offset, IsDeleted } = getContactsDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
    };
    return this.contactRepository.find(options);
  }

  async showContact(idDto: IdDto): Promise<Contact> {
    const { Id } = idDto;
    const found = await this.contactRepository.findOne(Id);
    if (!found) throw NotFound(this.entity, Id);
    return found;
  }

  async createContact(createContactDto: CreateContactDto): Promise<Contact> {
    const contact = new Contact();
    _.merge(contact, createContactDto);
    try {
      const message = this.buildMessage(contact, 'Create');
      const response = await fetch(EmailJsUrl, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    return this.contactRepository.save(contact);
  }

  async updateContact(updateContactDto: UpdateContactDto): Promise<Contact> {
    const { Id, ...updates } = updateContactDto;
    const contact = await this.showContact({ Id });
    if (!_.isEmpty(updates)) _.merge(contact, updates);
    return this.contactRepository.save(contact);
  }

  async deleteContact(idDto: IdDto): Promise<Contact> {
    const contact = await this.showContact(idDto);
    contact.IsDeleted = true;
    return this.contactRepository.save(contact);
  }

  private buildMessage(contact: Contact, action: string) {
    const message = new EmailJsMessage();
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.service_id = process.env.EMAIL_JS_SERVICE_ID;
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.template_id = process.env.EMAIL_JS_CONTACT_TEMPLATE_ID;
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.user_id = process.env.EMAIL_JS_USER_ID;
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.template_params = {};
    message.template_params['Subject'] = `${action} Contact: ${contact.Subject}`;
    message.template_params['Name'] = FormattedName(contact.Name);
    message.template_params['Address'] = FormattedAddress(contact.Address);
    message.template_params['EmailType'] = contact.EmailType;
    message.template_params['Email'] = contact.Email;
    message.template_params['PhoneType'] = contact.PhoneType;
    message.template_params['Phone'] = contact.Phone;
    message.template_params['Preffered'] = contact.Preferred;
    message.template_params['Message'] = contact.Message;
    return message;
  }
}
