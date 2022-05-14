import { MonthEnum } from '../enum';
import { Column } from 'typeorm';

export class MonthYear {
  @Column({
    type: 'enum',
    enum: MonthEnum,
  })
  Month?: string;

  @Column({ type: 'int', nullable: true })
  Year?: number;
}
