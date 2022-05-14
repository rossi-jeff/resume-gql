import { BaseModel } from '../global/base';
import { Entity, Column } from 'typeorm';
import { EmailTypeEnum } from '../global/enum';

@Entity()
export class Email extends BaseModel {
  @Column({
    type: 'enum',
    enum: EmailTypeEnum,
    nullable: true,
  })
  Type: string;

  @Column({ nullable: true })
  Address: string;
}
