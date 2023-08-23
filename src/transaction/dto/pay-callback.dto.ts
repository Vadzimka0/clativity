import { IsUUID } from 'class-validator';

export class PayCallbackDto {
  @IsUUID()
  readonly session_id: string;
}
