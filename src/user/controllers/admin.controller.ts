import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { RoleGuard } from 'src/auth/guards/role.guard';
import { AccountTypeEnum } from '../enums/account-type.enum';
import { UserService } from '../services/user.service';
import { UserEntity } from '../entities';
import { PaginationParamsDto } from '../dto/pagination-params.dto';
import { TransactionService } from 'src/transaction/transaction.service';
import { TransactionWithUserData } from 'src/transaction/types';

@UseGuards(RoleGuard(AccountTypeEnum.ADMIN))
@Controller()
export class AdminController {
  constructor(
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
  ) {}

  @Get('users')
  async getUsers(
    @Query() { offset, limit }: PaginationParamsDto,
  ): Promise<{ users: UserEntity[]; count: number }> {
    return this.userService.getAllUsers(offset, limit);
  }

  @Get('transactions')
  async getTransactions(
    @Query() { offset, limit }: PaginationParamsDto,
  ): Promise<{ transactions: TransactionWithUserData[]; count: number }> {
    const data = await this.transactionService.getTopUpTransactions(
      offset,
      limit,
    );
    const transactions =
      this.transactionService.buildTransactionsRequiredFormat(
        data.transactions,
      );

    return { transactions, count: data.count };
  }
}
