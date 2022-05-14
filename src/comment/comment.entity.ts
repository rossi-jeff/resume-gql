import { BaseModel } from '../global/base';
import { Entity, Column, BeforeInsert, ManyToMany, JoinTable } from 'typeorm';
import { CommentTypeEnum } from '../global/enum';
import { v4 } from 'uuid';
import { Admin } from '../admin/admin.entity';
import { Reference } from '../reference/reference.entity';
import { Visitor } from '../visitor/visitor.entity';

@Entity()
export class Comment extends BaseModel {
  @Column({
    type: 'enum',
    enum: CommentTypeEnum,
  })
  Type: string;

  @Column({ type: 'text', nullable: true })
  Message: string;

  @Column({ type: 'boolean', default: false })
  Approved: boolean;

  @Column({ nullable: true })
  UUID: string;

  @BeforeInsert()
  setUUID() {
    this.UUID = v4();
  }

  // relations

  @ManyToMany(type => Admin, { cascade: true })
  @JoinTable({ name: 'admin_comment' })
  Admins: Admin[];

  @ManyToMany(type => Reference, { cascade: true })
  @JoinTable({ name: 'reference_comment' })
  References: Reference[];

  @ManyToMany(type => Visitor, { cascade: true })
  @JoinTable({ name: 'visitor_comment' })
  Visitors: Visitor[];
}
