import { IsString } from 'class-validator';

export class TextToSpeechVoicesDto {
  @IsString()
  languageId: string;

  @IsString()
  dialectId: string;
}
