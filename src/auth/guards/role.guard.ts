import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';

import { JwtAuthGuard } from './jwt-auth.guard';
import { AccountTypeEnum } from 'src/user/enums/account-type.enum';
import { ExpressRequestType } from '../types';

export const RoleGuard = (acc_type: AccountTypeEnum): Type<CanActivate> => {
  class RoleGuardMixin extends JwtAuthGuard {
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);

      const request = context.switchToHttp().getRequest<ExpressRequestType>();
      const user = request.user;

      return user?.account_type === acc_type;
    }
  }

  return mixin(RoleGuardMixin);
};
