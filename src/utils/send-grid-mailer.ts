import axios from 'axios';
import { Message } from '../global/type/message.mailer';
import * as config from 'config';

export class SendGridMailer {
  axios: any = axios;
  apiKey: string = config.get('mailer.key');
  endpoint: string = 'https://api.sendgrid.com/v3/mail/send';

  headers() {
    return {
      Authorization: `Bearer ${this.apiKey}`,
      'Content-Type': 'application/json',
    };
  }

  body(message: Message) {
    return {
      personalizations: [
        {
          to: [
            {
              email: message.to,
            },
          ],
          subject: message.subject,
        },
      ],
      from: {
        email: message.from,
      },
      content: [
        {
          type: 'text/html',
          value: message.html,
        },
      ],
    };
  }

  async send(message: Message) {
    return this.axios({
      url: this.endpoint,
      method: 'POST',
      headers: this.headers(),
      // data: message,
      data: this.body(message),
    });
  }
}
