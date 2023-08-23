import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { BullModule } from '@nestjs/bull';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { EmailConfirmationService } from './email-services';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EmailConsumer } from './consumers/email.consumer';
import { EMAIL_SEND_QUEUE } from '../shared/constants';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({}),
    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: configService.get('EMAIL_PORT'),
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        redis: {
          host: configService.get('REDIS_HOST'),
          port: configService.get('REDIS_PORT'),
        },
      }),
      inject: [ConfigService],
    }),
    BullModule.registerQueue({
      name: EMAIL_SEND_QUEUE,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    EmailConfirmationService,
    EmailConsumer,
  ],
})
export class AuthModule {}
