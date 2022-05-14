import { BaseModel } from '../global/base';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Parameter } from '../parameter/parameter.entity';
import { LinkTypeEnum } from '../global/enum';

@Entity()
export class Link extends BaseModel {
  @Column({ nullable: true })
  Url: string;

  @Column({ nullable: true })
  Title: string;

  @Column({ type: 'text', nullable: true })
  Description: string;

  @Column({
    type: 'enum',
    enum: LinkTypeEnum,
    nullable: true,
  })
  Type: string;

  @ManyToMany(type => Parameter, { cascade: true })
  @JoinTable({ name: 'link_parameter' })
  Parameters: Parameter[];
}
