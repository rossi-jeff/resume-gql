import { Column } from 'typeorm';

export class Credentials {
  @Column({ nullable: true })
  Username?: string;

  @Column({ nullable: true })
  Password?: string;
}
