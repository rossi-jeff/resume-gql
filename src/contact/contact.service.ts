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
import { DefaultLimit, To, DefaultFrom } from '../global/constants';
import { NotFound } from '../global/error';
import * as _ from 'lodash';
import { SendGridMailer } from '../utils/send-grid-mailer';
import { Message } from '../global/type';
import { FormattedName } from '../utils/formatted-name';
import { JsonToHtml } from '../utils/json-to-html';

@Injectable()
export class ContactService {
  private entity: any = Contact;
  private mailer: any = new SendGridMailer();
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
      await this.mailer.send(this.buildMessage(contact, 'Create'));
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
    const message = new Message();
    message.to = To;
    message.from = DefaultFrom;
    message.subject = contact.Name
      ? `${action} Contact: ${FormattedName(contact.Name)}`
      : `${action} Contact`;
    message.html = JsonToHtml(contact);
    return message;
  }
}
