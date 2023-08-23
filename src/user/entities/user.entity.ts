import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { TopUpTransactionEntity } from '../../transaction/entities/top-up-transaction.entity';
import { WritingOffTransactionEntity } from '../../transaction/entities/writing-off-transaction.entity';
import { AccountTypeEnum } from '../enums/account-type.enum';
import { BalanceEntity } from './balance.entity';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Exclude()
  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: AccountTypeEnum,
    default: AccountTypeEnum.TEST,
  })
  account_type: AccountTypeEnum;

  @OneToOne(() => BalanceEntity, (balance) => balance.user, { cascade: true })
  balance: BalanceEntity;

  @OneToMany(() => TopUpTransactionEntity, (transaction) => transaction.user)
  topup_transactions: TopUpTransactionEntity[];

  @OneToMany(
    () => WritingOffTransactionEntity,
    (transaction) => transaction.user,
  )
  writingoff_transactions: WritingOffTransactionEntity[];
}
