import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Queue } from 'bull';
import { InjectQueue } from '@nestjs/bull';

import { UserService } from 'src/user/services';
import { AccountTypeEnum } from 'src/user/enums/account-type.enum';
import { EmailConfirmType, TokenPayload } from '../types';
import { CONFIRM_PROCESS, EMAIL_SEND_QUEUE } from '../../shared/constants';

@Injectable()
export class EmailConfirmationService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @InjectQueue(EMAIL_SEND_QUEUE) private readonly emailQueue: Queue,
  ) {}

  public sendVerificationLink(email: string) {
    const payload: TokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_VERIFICATION_TOKEN_EXPIRATION_TIME',
      )}s`,
    });
    const url = `${this.configService.get(
      'EMAIL_CONFIRMATION_URL',
    )}?secret_code=${token}`;
    const data: EmailConfirmType = { email, url };

    return this.emailQueue.add(CONFIRM_PROCESS, data);
  }

  public async confirmEmail(email: string) {
    const user = await this.userService.getByEmail(email);

    if (user.account_type === AccountTypeEnum.VALID) {
      throw new BadRequestException('Email already confirmed');
    }

    return await this.userService.activateAccount(email);
  }

  public async decodeConfirmationToken(token: string) {
    try {
      const payload = await this.jwtService.verify(token, {
        secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
      });

      if (typeof payload === 'object' && 'email' in payload) {
        return payload.email;
      }

      throw new BadRequestException();
    } catch (error) {
      if (error?.name === 'TokenExpiredError') {
        throw new BadRequestException('Email confirmation token expired');
      }
      throw new BadRequestException('Bad confirmation token');
    }
  }
}
