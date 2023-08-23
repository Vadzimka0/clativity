import { IsNumber, IsString, MaxLength } from 'class-validator';

export class ParaphraseGenerateDto {
  @IsString()
  @MaxLength(3000)
  text: string;

  @IsNumber()
  styleId: number;
}
