import { User } from '../global/base';
import { Address } from '../global/embedded';
import { Column, ManyToMany, JoinTable, Entity } from 'typeorm';
import { Phone } from '../phone/phone.entity';
import { Email } from '../email/email.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Admin extends User {
  @Column(type => Address)
  Address: Address;

  @ManyToMany(type => Phone, { cascade: true })
  @JoinTable({ name: 'admin_phone' })
  Phones: Phone[];

  @ManyToMany(type => Email, { cascade: true })
  @JoinTable({ name: 'admin_email' })
  Emails: Email[];

  @ManyToMany(type => Comment, { cascade: true })
  @JoinTable({ name: 'admin_comment' })
  Comments: Comment[];
}
