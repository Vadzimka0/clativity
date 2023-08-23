import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';

import { TransactionService } from './transaction.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExpressRequestType } from 'src/auth/types';
import { TopUpTransactionEntity } from './entities/top-up-transaction.entity';
import { GetPayLinkDto, PayCallbackDto } from './dto';

@UseGuards(JwtAuthGuard)
@Controller()
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post('get-pay-link')
  @HttpCode(200)
  async getPayLink(
    @Req() request: ExpressRequestType,
    @Body() { amount_count }: GetPayLinkDto,
  ): Promise<{ url: string; session_id: string }> {
    return await this.transactionService.getPayLink(request.user, amount_count);
  }

  @Post('pay-callback')
  @HttpCode(200)
  async getPayCallback(
    @Req() request: ExpressRequestType,
    @Body() { session_id }: PayCallbackDto,
  ): Promise<TopUpTransactionEntity> {
    return await this.transactionService.getPayCallback(
      request.user,
      session_id,
    );
  }
}
