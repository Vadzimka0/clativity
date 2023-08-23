import { IsString, MaxLength } from 'class-validator';

export class GenerateImageDto {
  @IsString()
  @MaxLength(1000)
  content: string;

  @IsString()
  style: string;
}
