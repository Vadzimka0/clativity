import { IsNumber } from 'class-validator';

export class GetPayLinkDto {
  @IsNumber()
  readonly amount_count: number;
}
