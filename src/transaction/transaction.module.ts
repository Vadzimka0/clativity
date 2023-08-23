import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';

import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { QuickPaymentsService } from './payment-service/quickpayments.service';
import { UserModule } from 'src/user/user.module';
import {
  TopUpTransactionEntity,
  WritingOffTransactionEntity,
} from './entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TopUpTransactionEntity,
      WritingOffTransactionEntity,
    ]),
    HttpModule,
    forwardRef(() => UserModule),
  ],
  controllers: [TransactionController],
  providers: [TransactionService, QuickPaymentsService],
  exports: [TransactionService],
})
export class TransactionModule {}
