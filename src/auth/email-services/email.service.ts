import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly configService: ConfigService,
  ) {}

  async sendUserConfirmation(email: string, token: string) {
    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?secret_code=${token}`;

    await this.mailerService.sendMail({
      to: email,
      from: this.configService.get('EMAIL_USER'),
      subject: 'Welcome to AIFactory! Confirm your Email',
      html: `
        <h3>
          <span>To confirm the email address, click here: </span>
          <a href=${url} target="_blank">CONFIRM
        </h3>
      `,
    });
  }
}
