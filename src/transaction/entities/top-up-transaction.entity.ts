import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';

import { TransactionStatusEnum } from '../enum/transaction-status.enum';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'topup_transactions' })
export class TopUpTransactionEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  session_id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  neuron_qnt: number;

  @Column({
    type: 'enum',
    enum: TransactionStatusEnum,
    default: TransactionStatusEnum.PENDING,
  })
  status: TransactionStatusEnum;

  @ManyToOne(() => UserEntity, (user) => user.topup_transactions)
  user: UserEntity;
}
