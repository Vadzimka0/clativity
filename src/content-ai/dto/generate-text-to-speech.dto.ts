import { IsString, MaxLength } from 'class-validator';

export class GenerateTextToSpeechDto {
  @IsString()
  @MaxLength(1000)
  content: string;

  @IsString()
  voiceId: string;
}
