import { Injectable, HttpStatus } from '@nestjs/common';
import { SlackConfig } from './slack-config';
import * as config from './slack.json';
import * as crypto from 'crypto';
import * as tsscmp from 'tsscmp';
import { SlackEvent } from './slack-event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { WebClient } from '@slack/web-api';
import {
  CreateConversationDto,
  PostMessageDto,
  EventReceivedDto,
} from '../global/dto';
import { SlackChannel } from './slack-channel.entity';
import { ConversationSource } from '../global/enum';
import * as shortid from 'shortid';
import { PubSub } from 'graphql-subscriptions';
import { SendGridMailer } from '../utils/send-grid-mailer';
import { To, DefaultFrom } from '../global/constants';

@Injectable()
export class SlackService {
  config: SlackConfig = config;
  client: any = new WebClient(this.config.oAuthToken);
	pubsub: any = new PubSub();
	private mailer: any = new SendGridMailer();

  constructor(
    @InjectRepository(SlackEvent)
    private slackEventRepo: Repository<SlackEvent>,
    @InjectRepository(SlackChannel)
    private slackChannelRepo: Repository<SlackChannel>,
  ) {}

  async receiveEvent(headers: any, event: any, response: any) {
    console.log('receiveEvent', event.event_id, event.type);
    if (!event.type) {
      console.log('missing type');
      return response.status(HttpStatus.BAD_REQUEST).send('type not found');
    }
    if (!this.validateHeaders(headers, event)) {
      console.log('invalid');
      return response.status(HttpStatus.BAD_REQUEST).send('signature mismatch');
    }
    if (event.type === 'url_verification') {
      return this.urlVerification(event, response);
    } else {
      return await this.eventCallback(event, response);
    }
  }

  validateHeaders(headers, event) {
    // console.log('validateHeaders', headers);
    const reqSig = headers['x-slack-signature'] as string;
    const reqTS = headers['x-slack-request-timestamp'];

    const [version, hash] = reqSig.split('=');
    const base = `${version}:${reqTS}:${JSON.stringify(event)}`;

    const digest = crypto
      .createHmac('sha256', this.config.signingSecret)
      .update(base)
      .digest('hex');

    let valid = tsscmp(hash, digest);
    if (!valid) {
      // console.log(hash);
      // console.log(digest);
      if (event.token === this.config.verificationToken) {
        valid = !valid;
      }
    }
    return valid;
  }

  urlVerification(event: any, response: any) {
    if (event.token === this.config.verificationToken && event.challenge) {
      return response
        .status(HttpStatus.OK)
        .json({ challenge: event.challenge });
    } else {
      return response
        .status(HttpStatus.BAD_REQUEST)
        .json({ error: 'token does not match' });
    }
  }

  async eventCallback(event: any, response: any) {
    console.log('eventCallback', event);
    const newEvent = await this.saveEvent(event);
    this.pubsub.publish('eventReceived', { eventReceived: newEvent });
    return response.status(HttpStatus.OK).send();
  }

  async saveEvent(event: any) {
    const slackEvent = new SlackEvent();
    const {
      event_id,
      event: {
        client_msg_id,
        type,
        subtype,
        text,
        user,
        team,
        event_ts,
        channel,
        channel_type,
        reaction,
        item,
				previous_message,
				bot_id,
      },
    } = event;
    slackEvent.EventId = event_id;
    slackEvent.EventTS = event_ts;
    slackEvent.Type = type;
    if (client_msg_id) {
      slackEvent.ClientMsgId = client_msg_id;
    }
    if (subtype) {
      slackEvent.SubType = subtype;
    }
    if (text) {
      slackEvent.Text = text;
    }
    if (user) {
      slackEvent.User = user;
    }
    if (team) {
      slackEvent.Team = team;
    }
    if (channel) {
      slackEvent.Channel = channel;
    }
    if (channel_type) {
      slackEvent.ChannelType = channel_type;
    }
    if (reaction) {
      slackEvent.Reaction = reaction;
		}
		if (bot_id) {
			slackEvent.BotId = bot_id;
		}
		if (item) {
			let { type: Type, channel: Channel, ts: TS } = item;
			slackEvent.Item = { Type, Channel, TS };
		}
    if (previous_message) {
      let {
        client_msg_id: ClientMsgId,
        type: Type,
        text: Text,
        ts: TS,
        user: User,
        team: Team,
      } = previous_message;
      slackEvent.PreviousMessage = {
        ClientMsgId,
        Type,
        Text,
        TS,
        User,
        Team,
      };
    }

    return this.slackEventRepo.save(slackEvent);
  }

  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<SlackChannel> {
    const users = await this.listUsers();
    const { Source, Name } = createConversationDto;
    const conversation = await this.client.conversations.create({
      token: this.config.oAuthToken,
      name: this.channelName(Source, Name),
      is_private: false,
      user_ids: users.members.map(user => user.id),
    });
    console.log(conversation);
    if (conversation.ok) {
      const {
        channel: { id: ChannelId, name: ChannelName },
      } = conversation;
      const slackChannel = new SlackChannel();
      slackChannel.ChannelId = ChannelId;
      slackChannel.ChannelName = ChannelName;
      return this.slackChannelRepo.save(slackChannel);
    } else {
      return null;
    }
  }

  async listConversations(): Promise<SlackChannel[]> {
    return this.slackChannelRepo.find();
  }

  async postMessage(postMessageDto: PostMessageDto): Promise<boolean> {
    const { Name, Message, ChannelId } = postMessageDto;
    const message = await this.client.chat.postMessage({
      token: this.config.oAuthToken,
      text: this.formatMessage(Name, Message),
      channel: ChannelId,
		});
		await this.notifyMessage(Name, Message, ChannelId);
    console.log(message);
    return message ? true : false;
  }

  formatMessage(Name, Message) {
    return `*${Name}*\n\n${Message}`;
  }

  async listUsers() {
    return await this.client.users.list({ token: this.config.oAuthToken });
  }

  channelName(Source, Name) {
    let channelName = `${ConversationSource[Source]}-`;
    channelName += Name.split(' ')
      .map(part => part.replace(/[^A-Za-z0-9]/g, ''))
      .join('-');
    channelName += `-${shortid.generate()}`;
    return channelName.toLowerCase();
  }

  listChannelEvents(eventReceivedDto: EventReceivedDto): Promise<SlackEvent[]> {
    const { ChannelId } = eventReceivedDto;
    return this.slackEventRepo.find({
      where: [{ Channel: ChannelId }, { Item: { Channel: ChannelId } }],
    });
	}
	
	async notifyMessage(Name: string, Message: string, ChannelId: string) {
		const message: any = {}
		message.to = To;
		message.from = DefaultFrom;
		message.subject = `Slack: ${Name} on ${ChannelId}`;
		message.html = Message;
		try {
			await this.mailer.send(message);
		} catch (e) {
			console.log(e)
		}
	}
}
