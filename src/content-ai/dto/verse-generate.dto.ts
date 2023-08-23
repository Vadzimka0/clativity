import { IsNumber, IsString, MaxLength } from 'class-validator';

export class VerseGenerateDto {
  @IsString()
  @MaxLength(300)
  theme: string;

  @IsNumber()
  styleId: number;

  @IsNumber()
  stanzaCount: number;

  @IsNumber()
  stanzaSize: number;
}
