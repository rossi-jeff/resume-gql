import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { EmailService } from './email.service';
import {
  IdDto,
  LimitOffsetDeletedDTO,
  CreateEmailDto,
  UpdateEmailDto,
} from '../global/dto';
import { EmailType } from './email.type';

@Resolver('Email')
export class EmailResolver {
  constructor(private emailService: EmailService) {}

  @Query(returns => [EmailType])
  async getEmails(@Args() getEmailsDto: LimitOffsetDeletedDTO) {
    return this.emailService.getEmails(getEmailsDto);
  }

  @Query(returns => EmailType)
  async showEmail(@Args() idDto: IdDto) {
    return this.emailService.showEmail(idDto);
  }

  @Mutation(returns => EmailType)
  async createEmail(@Args() createEmailDto: CreateEmailDto) {
    return this.emailService.createEmail(createEmailDto);
  }

  @Mutation(returns => EmailType)
  async updateEmail(@Args() updateEmailDto: UpdateEmailDto) {
    return this.emailService.updateEmail(updateEmailDto);
  }

  @Mutation(returns => Boolean)
  async deleteEmail(@Args() idDto: IdDto) {
    return this.emailService.deleteEmail(idDto);
  }
}
