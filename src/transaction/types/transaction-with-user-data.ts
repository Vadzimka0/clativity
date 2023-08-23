import { UserEntity } from 'src/user/entities';
import { TopUpTransactionEntity } from '../entities';

export type TransactionWithUserData = TopUpTransactionEntity & UserEntity;
