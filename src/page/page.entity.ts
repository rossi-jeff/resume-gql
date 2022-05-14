import { BaseModel } from '../global/base';
import { Column, Entity } from 'typeorm';

@Entity()
export class Page extends BaseModel {
  @Column({ nullable: true, unique: true })
  Name: string;

  @Column({ type: 'text', nullable: true })
  Content: string;
}
