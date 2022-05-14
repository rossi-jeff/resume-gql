import { User } from '../global/base';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Address } from '../global/embedded';
import { Email } from '../email/email.entity';
import { Phone } from '../phone/phone.entity';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Reference extends User {
  @Column(type => Address)
  Address: Address;

  @Column({ nullable: true })
  Title: string;

  @Column({ nullable: true })
  Company: string;

  @ManyToMany(type => Phone, { cascade: true })
  @JoinTable({ name: 'reference_phone' })
  Phones: Phone[];

  @ManyToMany(type => Email, { cascade: true })
  @JoinTable({ name: 'reference_email' })
  Emails: Email[];

  @ManyToMany(type => Comment, { cascade: true })
  @JoinTable({ name: 'reference_comment' })
  Comments: Comment[];

  @Column({ type: 'boolean', default: false })
  Approved: boolean;
}
