import { ConfigService } from '@nestjs/config';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import {
  TopUpTransactionEntity,
  WritingOffTransactionEntity,
} from './entities';
import { UserEntity } from 'src/user/entities';
import { QuickPaymentsService } from './payment-service/quickpayments.service';
import { TransactionStatusEnum } from './enum/transaction-status.enum';
import { BalanceService } from 'src/user/services';
import { OrderInfoType, TransactionWithUserData } from './types';
import { PaginationParamsDto } from 'src/user/dto/pagination-params.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectEntityManager()
    private entityManager: EntityManager,
    @InjectRepository(TopUpTransactionEntity)
    private readonly topUpTransactionRepository: Repository<TopUpTransactionEntity>,
    @InjectRepository(WritingOffTransactionEntity)
    private readonly writingOffTransactionRepository: Repository<WritingOffTransactionEntity>,
    private readonly quickPaymentsService: QuickPaymentsService,
    private readonly configService: ConfigService,
    private readonly balanceService: BalanceService,
  ) {}

  async getPayLink(
    user: UserEntity,
    amount_count: number,
  ): Promise<{ url: string; session_id: string }> {
    const orderInfo: OrderInfoType = {
      email: user.email,
      amount: amount_count / this.configService.get('NEURON_EURO_RATE'),
      currency: 'EUR',
      return_url: this.configService.get('REDIRECT_URL_AFTER_PAYMENT'),
    };

    const data = await this.quickPaymentsService.getCreatedPaymentData(
      orderInfo,
    );
    const session_id = data.payment_session.id;

    await this.createTopUpTransaction(user, {
      id: data.card_transaction.id,
      session_id,
      neuron_qnt: amount_count,
    });

    return { url: data.url, session_id };
  }

  async createTopUpTransaction(
    user: UserEntity,
    data: { id: string; session_id: string; neuron_qnt: number },
  ): Promise<TopUpTransactionEntity> {
    const newTopUpTransaction = new TopUpTransactionEntity();
    Object.assign(newTopUpTransaction, data);

    newTopUpTransaction.user = user;

    return await this.topUpTransactionRepository.save(newTopUpTransaction);
  }

  async getPayCallback(
    user: UserEntity,
    session_id: string,
  ): Promise<TopUpTransactionEntity> {
    const topUpTransaction = await this.topUpTransactionRepository.findOne({
      where: { session_id },
    });

    if (!topUpTransaction) {
      throw new NotFoundException(
        'Transaction with this order_id does not exist',
      );
    }

    if (topUpTransaction.status === TransactionStatusEnum.CONFIRMED) {
      return topUpTransaction;
    }

    const info = await this.quickPaymentsService.getPaymentInfo(session_id);

    if (info.payment_session.status === 'success') {
      const confirmedTransaction =
        await this.updateTransactionStatusAndChangeBalance(
          topUpTransaction,
          user.id,
        );
      return confirmedTransaction;
    }

    return topUpTransaction;
  }

  async updateTransactionStatusAndChangeBalance(
    topUpTransaction: TopUpTransactionEntity,
    userId: string,
  ): Promise<TopUpTransactionEntity> {
    await this.entityManager.transaction(async (transactionManager) => {
      topUpTransaction.status = TransactionStatusEnum.CONFIRMED;
      await transactionManager.save(topUpTransaction);

      await this.balanceService.changeBalance(
        userId,
        topUpTransaction.neuron_qnt,
        transactionManager,
      );
    });

    return topUpTransaction;
  }

  async createWritingOffTransaction(
    user: UserEntity,
    data: { service_type: string; service_qnt: number; neuron_qnt: number },
    transactionManager: EntityManager,
  ): Promise<WritingOffTransactionEntity> {
    const newWritingOffTransaction = new WritingOffTransactionEntity();
    Object.assign(newWritingOffTransaction, data);

    newWritingOffTransaction.user = user;

    return await transactionManager.save(newWritingOffTransaction);
  }

  async getMyWritingOffTransactions(
    { offset, limit }: PaginationParamsDto,
    userId: string,
  ): Promise<{ transactions: WritingOffTransactionEntity[]; count: number }> {
    const [transactions, count] =
      await this.writingOffTransactionRepository.findAndCount({
        relations: {
          user: true,
        },
        where: { user: { id: userId } },
        order: {
          created_at: 'ASC',
        },
        skip: offset,
        take: limit,
      });

    return { transactions, count };
  }

  async getTopUpTransactions(
    offset?: number,
    limit?: number,
  ): Promise<{ transactions: TopUpTransactionEntity[]; count: number }> {
    const [transactions, count] =
      await this.topUpTransactionRepository.findAndCount({
        where: { status: TransactionStatusEnum.CONFIRMED },
        relations: {
          user: true,
        },
        order: {
          created_at: 'ASC',
        },
        skip: offset,
        take: limit,
      });

    return { transactions, count };
  }

  buildTransactionsRequiredFormat(
    list: TopUpTransactionEntity[],
  ): TransactionWithUserData[] {
    return list.map((item: TransactionWithUserData) => {
      item.name = item.user.name;
      item.email = item.user.email;
      item.account_type = item.user.account_type;
      delete item.session_id;
      delete item.status;
      delete item.user;

      return item;
    });
  }
}
