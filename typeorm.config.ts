import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { UserEntity } from './src/user/entities/user.entity';
import { BalanceEntity } from './src/user/entities/balance.entity';
import { TopUpTransactionEntity } from './src/transaction/entities/top-up-transaction.entity';
import { WritingOffTransactionEntity } from './src/transaction/entities/writing-off-transaction.entity';

config({
  path: './.production.env',
});

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  // entities: [__dirname + '/**/entities/*.entity{.js,.ts}'],
  entities: [
    UserEntity,
    BalanceEntity,
    TopUpTransactionEntity,
    WritingOffTransactionEntity,
  ],
  migrations: [__dirname + '/src/database/migrations/**/*{.js,.ts}'],
  namingStrategy: new SnakeNamingStrategy(),
});
