import { IsNotEmpty, IsString } from 'class-validator';

export class ConfirmEmailDto {
  @IsString()
  @IsNotEmpty()
  secret_code: string;
}
