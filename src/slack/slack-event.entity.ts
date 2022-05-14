import { BaseModel } from '../global/base';
import { Column, Entity } from 'typeorm';

export class SlackEventItem {
  @Column({ nullable: true })
  Type: string;

  @Column({ nullable: true })
  Channel: string;

  @Column({ nullable: true })
  TS: string;
}

export class SlackPreviousMessage {
  @Column({ nullable: true })
  ClientMsgId: string;

  @Column({ nullable: true })
  Type: string;

  @Column({ nullable: true })
  Text: string;

  @Column({ nullable: true })
  User: string;

  @Column({ nullable: true })
  Team: string;

  @Column({ nullable: true })
  TS: string;
}

@Entity()
export class SlackEvent extends BaseModel {
  @Column({ nullable: true })
  EventId: string;

  @Column({ nullable: true })
  EventTS: string;

  @Column({ nullable: true })
  ClientMsgId: string;

  @Column({ nullable: true })
  Type: string;

  @Column({ nullable: true })
  Text: string;

  @Column({ nullable: true })
  SubType: string;

  @Column({ nullable: true })
  Channel: string;

  @Column({ nullable: true })
  ChannelType: string;

  @Column({ nullable: true })
  User: string;

  @Column({ nullable: true })
  Reaction: string;

  @Column({ nullable: true })
  Team: string;

  @Column(type => SlackEventItem)
  Item: SlackEventItem;

  @Column(type => SlackPreviousMessage)
  PreviousMessage: SlackPreviousMessage;

  @Column({ nullable: true })
  ThreadTS: string;

  @Column({ nullable: true })
  BotId: string;
}
