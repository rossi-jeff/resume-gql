import { BaseModel } from '../global/base';
import { Entity, Column } from 'typeorm';
import { Name, Address } from '../global/embedded';
import { EmailTypeEnum, PhoneTypeEnum, PreferredContact } from '../global/enum';

@Entity()
export class Contact extends BaseModel {
  @Column(type => Name)
  Name: Name;

  @Column(type => Address)
  Address: Address;

  @Column({
    type: 'enum',
    enum: EmailTypeEnum,
    nullable: true,
  })
  EmailType: EmailTypeEnum;

  @Column({ nullable: true })
  Email: string;

  @Column({
    type: 'enum',
    enum: PhoneTypeEnum,
    nullable: true,
  })
  PhoneType: PhoneTypeEnum;

  @Column({ nullable: true })
  Phone: string;

  @Column({
    type: 'enum',
    enum: PreferredContact,
    nullable: true,
  })
  Preferred: PreferredContact;

  @Column({ nullable: true })
  Subject: string;

  @Column({ nullable: true })
  Message: string;
}
