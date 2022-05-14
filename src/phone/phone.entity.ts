import { BaseModel } from '../global/base';
import { Entity, Column } from 'typeorm';
import { PhoneTypeEnum } from '../global/enum';

@Entity()
export class Phone extends BaseModel {
  @Column({
    type: 'enum',
    enum: PhoneTypeEnum,
    nullable: true,
  })
  Type: string;

  @Column({ nullable: true })
  Number: string;

  @Column({ nullable: true })
  Extension: string;
}
