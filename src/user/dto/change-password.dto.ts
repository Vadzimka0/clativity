import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(7)
  readonly password_confirm: string;
}
