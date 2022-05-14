import { BaseModel } from '../global/base';
import { Entity, Column } from 'typeorm';
import { Address, MonthYear } from '../global/embedded';

@Entity()
export class School extends BaseModel {
  @Column({ nullable: true })
  Name: string;

  @Column(type => Address)
  Address: Address;

  @Column({ nullable: true })
  Program: string;

  @Column({ nullable: true })
  Degree: string;

  @Column(type => MonthYear)
  From: MonthYear;

  @Column(type => MonthYear)
  To: MonthYear;
}
