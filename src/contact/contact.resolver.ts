import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { ContactService } from './contact.service';
import {
  LimitOffsetDeletedDTO,
  IdDto,
  CreateContactDto,
  UpdateContactDto,
} from '../global/dto';
import { ContactType } from './contact.type';

@Resolver('Contact')
export class ContactResolver {
  constructor(private contactService: ContactService) {}

  @Query(returns => [ContactType])
  async getContacts(@Args() getContactsDto: LimitOffsetDeletedDTO) {
    return this.contactService.getContacts(getContactsDto);
  }

  @Query(returns => ContactType)
  async showContact(@Args() idDto: IdDto) {
    return this.contactService.showContact(idDto);
  }

  @Mutation(returns => ContactType)
  async createContact(@Args() createContactDto: CreateContactDto) {
    return this.contactService.createContact(createContactDto);
  }

  @Mutation(returns => ContactType)
  async updateContact(@Args() updateContactDto: UpdateContactDto) {
    return this.contactService.updateContact(updateContactDto);
  }

  @Mutation(returns => ContactType)
  async deleteContact(@Args() idDto: IdDto) {
    return this.contactService.deleteContact(idDto);
  }
}
