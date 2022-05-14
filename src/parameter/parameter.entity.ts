import { BaseModel } from '../global/base';
import { Column, Entity, ManyToMany, JoinTable } from 'typeorm';
import { Link } from '../link/link.entity';

@Entity()
export class Parameter extends BaseModel {
  @Column({ nullable: true })
  Key: string;

  @Column({ nullable: true })
  Value: string;

  // @ManyToMany(type => Link, { cascade: true })
  // @JoinTable({ name: 'link_parameter' })
  // Links: Link[]
}
