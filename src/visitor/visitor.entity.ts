import { User } from '../global/base';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { Comment } from '../comment/comment.entity';

@Entity()
export class Visitor extends User {
  @Column({ nullable: true })
  Email: string;

  @Column({ type: 'boolean', default: false })
  Approved: boolean;

  @ManyToMany(type => Comment, { cascade: true })
  @JoinTable({ name: 'visitor_comment' })
  Comments: Comment[];
}
