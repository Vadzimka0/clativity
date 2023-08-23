import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { EmailConfirmationService } from './email-services';
import { ConfirmEmailDto, LoginDto, RegistrationDto } from './dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { ExpressRequestType } from './types';
import { UserEntity } from 'src/user/entities/user.entity';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailConfirmationService: EmailConfirmationService,
  ) {}

  @Post('registration')
  async registration(
    @Body() registrationDto: RegistrationDto,
  ): Promise<{ token: string }> {
    const token = await this.authService.registration(registrationDto);
    await this.emailConfirmationService.sendVerificationLink(
      registrationDto.email,
    );

    return { token };
  }

  @Post('registration-confirm')
  @HttpCode(200)
  async confirm(@Body() confirmEmailDto: ConfirmEmailDto): Promise<UserEntity> {
    const email = await this.emailConfirmationService.decodeConfirmationToken(
      confirmEmailDto.secret_code,
    );
    const activatedUser = this.emailConfirmationService.confirmEmail(email);

    return activatedUser;
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    const token = await this.authService.login(loginDto);

    return { token };
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  authenticate(@Req() request: ExpressRequestType): UserEntity {
    return request.user;
  }
}
