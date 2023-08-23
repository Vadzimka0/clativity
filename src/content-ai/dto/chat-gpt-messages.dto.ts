import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum ChatRole {
  SYSTEM = 'system',
  USER = 'user',
  ASSISTANT = 'assistant',
}

export class ChatGptMessagesDto {
  @IsEnum(ChatRole)
  role: ChatRole;

  @IsNotEmpty()
  @IsString()
  content: string;
}
