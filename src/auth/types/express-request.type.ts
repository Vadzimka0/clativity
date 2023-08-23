import { Request } from 'express';

import { UserEntity } from 'src/user/entities/user.entity';

export type ExpressRequestType = Request & {
  user?: UserEntity;
};
