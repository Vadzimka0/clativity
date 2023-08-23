import { Process, Processor } from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

import { CONFIRM_PROCESS, EMAIL_SEND_QUEUE } from '../../shared/constants';
import { EmailConfirmType } from '../types';

@Processor(EMAIL_SEND_QUEUE)
export class EmailConsumer {
  constructor(private readonly mailerService: MailerService) {}

  @Process(CONFIRM_PROCESS)
  async sendConfirmEmail(job: Job<unknown>) {
    const { email, url } = job.data as EmailConfirmType;

    await this.mailerService.sendMail({
      to: email,
      from: 'vadenisik@gmail.com', //this.configService.get('EMAIL_USER'),
      subject: 'Welcome to Clone! Confirm your Email',
      html: `
        <h3>
          <span>To confirm the email address, click here: </span>
          <a href=${url} target="_blank">CONFIRM
        </h3>
      `,
    });
  }
}
