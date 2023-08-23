import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';

import { BalanceEntity } from '../entities';
import { UserService } from './user.service';

@Injectable()
export class BalanceService {
  constructor(
    @InjectRepository(BalanceEntity)
    private readonly balanceRepository: Repository<BalanceEntity>,
    private readonly userService: UserService,
  ) {}

  async getBalance(id: string): Promise<number> {
    const user = await this.userService.getByIdWithRelation(id);

    return user.balance.value;
  }

  async changeBalance(
    userId: string,
    neuron_qnt: number,
    transactionManager: EntityManager,
  ): Promise<BalanceEntity> {
    const user = await this.userService.getByIdWithRelation(userId);
    user.balance.value = +user.balance.value + neuron_qnt;

    return await transactionManager.save(user.balance);
  }

  async isQntAvailable(userId: string, price: number): Promise<boolean> {
    const user = await this.userService.getByIdWithRelation(userId);

    if (+user.balance.value >= price) {
      return true;
    }

    return false;
  }
}
