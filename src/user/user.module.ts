import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BalanceEntity, UserEntity } from './entities';
import { AdminController, UserController } from './controllers';
import { BalanceService, UserService } from './services';
import { TransactionModule } from 'src/transaction/transaction.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BalanceEntity]),
    TransactionModule,
  ],
  controllers: [UserController, AdminController],
  providers: [UserService, BalanceService],
  exports: [UserService, BalanceService],
})
export class UserModule {}
