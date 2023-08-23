import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { UserEntity } from '../../user/entities/user.entity';

@Entity({ name: 'writingoff_transactions' })
export class WritingOffTransactionEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  service_type: string;

  @Column()
  service_qnt: number;

  @Column()
  neuron_qnt: number;

  @Exclude()
  @ManyToOne(() => UserEntity, (user) => user.writingoff_transactions)
  user: UserEntity;
}
