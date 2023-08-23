import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { UserEntity } from './user.entity';

@Entity({ name: 'balances' })
export class BalanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 7, scale: 2, default: 0.0 })
  value: number;

  @OneToOne(() => UserEntity, (user) => user.balance)
  @JoinColumn()
  user: UserEntity;
}
