import { Column } from 'typeorm';

export class Address {
  @Column({ nullable: true })
  Address?: string;

  @Column({ nullable: true })
  Suite?: string;

  @Column({ nullable: true })
  City?: string;

  @Column({ nullable: true })
  State?: string;

  @Column({ nullable: true })
  Zip?: string;
}
