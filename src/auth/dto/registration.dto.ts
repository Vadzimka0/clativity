import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsEmail()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  readonly password_confirm: string;
}
