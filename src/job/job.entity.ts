import { BaseModel } from '../global/base';
import { Column, Entity } from 'typeorm';
import { MonthYear, Address } from '../global/embedded';

@Entity()
export class Job extends BaseModel {
  @Column({ nullable: true })
  Company: string;

  @Column(type => Address)
  Address: Address;

  @Column({ nullable: true })
  Title: string;

  @Column({ nullable: true })
  Duties: string;

  @Column(type => MonthYear)
  From: MonthYear;

  @Column(type => MonthYear)
  To: MonthYear;
}
