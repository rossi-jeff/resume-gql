import { Column } from 'typeorm';
import { Salutation } from '../enum';

export class Name {
  @Column({
    nullable: true,
    type: 'enum',
    enum: Salutation,
  })
  Salutation: Salutation;

  @Column({ nullable: true })
  First: string;

  @Column({ nullable: true })
  Middle: string;

  @Column({ nullable: true })
  Last: string;

  @Column({ nullable: true })
  Suffix: string;
}
