import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcryptjs from 'bcryptjs';

import { CreateUserType } from '../types/create-user.type';
import { AccountTypeEnum } from '../enums/account-type.enum';
import { BalanceEntity, UserEntity } from '../entities';
import { ChangePasswordDto } from '../dto/change-password.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserData: CreateUserType): Promise<UserEntity> {
    const zeroBalance = new BalanceEntity();
    const newUser = new UserEntity();
    Object.assign(newUser, createUserData);
    newUser.balance = zeroBalance;

    return await this.userRepository.save(newUser);
  }

  async getByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (user) {
      return user;
    }

    throw new NotFoundException('User with this email does not exist');
  }

  async getById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (user) {
      return user;
    }

    throw new NotFoundException('User with this id does not exist');
  }

  async activateAccount(email: string): Promise<UserEntity> {
    await this.userRepository.update(
      { email },
      {
        account_type: AccountTypeEnum.VALID,
      },
    );

    return this.getByEmail(email);
  }

  async changePassword(
    { password, password_confirm }: ChangePasswordDto,
    user: UserEntity,
  ): Promise<UserEntity> {
    if (password !== password_confirm) {
      throw new UnprocessableEntityException('Passwords do not match');
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await this.userRepository.update(
      { id: user.id },
      {
        password: hashedPassword,
      },
    );

    return user;
  }

  async getAllUsers(
    offset?: number,
    limit?: number,
  ): Promise<{ users: UserEntity[]; count: number }> {
    const [users, count] = await this.userRepository.findAndCount({
      order: {
        created_at: 'ASC',
      },
      skip: offset,
      take: limit,
    });

    return { users, count };
  }

  async getByIdWithRelation(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: {
        balance: true,
      },
    });

    if (user) {
      return user;
    }

    throw new NotFoundException('User with this id does not exist');
  }
}
