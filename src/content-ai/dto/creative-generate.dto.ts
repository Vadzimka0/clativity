import { IsNumber } from 'class-validator';

export class CreativeGenerateDto {
  @IsNumber()
  themeId: number;
}
