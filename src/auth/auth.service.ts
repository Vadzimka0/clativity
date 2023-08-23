import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import PostgresErrorCode from 'src/database/postgresErrorCode.enum';
import { UserService } from 'src/user/services';
import { LoginDto, RegistrationDto } from './dto';
import { TokenPayload } from './types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async registration({
    name,
    email,
    password,
    password_confirm,
  }: RegistrationDto): Promise<string> {
    if (password !== password_confirm) {
      throw new UnprocessableEntityException('Passwords do not match');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    try {
      const createdUser = await this.userService.createUser({
        name,
        email,
        password: hashedPassword,
      });

      return this.getJwtToken(createdUser.email);
    } catch (error) {
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        throw new UnprocessableEntityException('User already exists');
      }
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async login({ email, password }: LoginDto): Promise<string> {
    try {
      const user = await this.userService.getByEmail(email);
      await this.verifyPassword(password, user.password);

      return this.getJwtToken(user.email);
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  private async verifyPassword(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<void> {
    const isPasswordMatching = await bcryptjs.compare(
      plainTextPassword,
      hashedPassword,
    );

    if (!isPasswordMatching) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  getJwtToken(email: string): string {
    const payload: TokenPayload = { email };
    const token = this.jwtService.sign(payload, {
      secret: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.get(
        'JWT_ACCESS_TOKEN_EXPIRATION_TIME',
      )}s`,
    });

    return token;
  }
}
