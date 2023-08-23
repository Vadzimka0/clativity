import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ExpressRequestType } from 'src/auth/types';
import { BalanceService, UserService } from '../services';
import { ChangePasswordDto } from '../dto/change-password.dto';
import { UserEntity } from '../entities';
import { PaginationParamsDto } from '../dto/pagination-params.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { WritingOffTransactionEntity } from 'src/transaction/entities';

@UseGuards(JwtAuthGuard)
@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly balanceService: BalanceService,
    private readonly transactionService: TransactionService,
  ) {}

  @Get('get-balance')
  async getBalance(
    @Req() request: ExpressRequestType,
  ): Promise<{ balance: number }> {
    const balance = await this.balanceService.getBalance(request.user.id);

    return { balance };
  }

  @Get('get-my-transactions')
  async getMyTransactions(
    @Query() queryParams: PaginationParamsDto,
    @Req() request: ExpressRequestType,
  ): Promise<{ transactions: WritingOffTransactionEntity[]; count: number }> {
    return await this.transactionService.getMyWritingOffTransactions(
      queryParams,
      request.user.id,
    );
  }

  @Post('change-password')
  @HttpCode(200)
  async changePassword(
    @Body() changePasswordDto: ChangePasswordDto,
    @Req() request: ExpressRequestType,
  ): Promise<UserEntity> {
    const user = await this.userService.changePassword(
      changePasswordDto,
      request.user,
    );

    return user;
  }
}
