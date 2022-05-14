import { BaseModel } from '../global/base';
import { Entity, Column } from 'typeorm';

@Entity()
export class SlackChannel extends BaseModel {
  @Column({ nullable: true })
  ChannelId: string;

  @Column({ nullable: true })
  ChannelName: string;
}
