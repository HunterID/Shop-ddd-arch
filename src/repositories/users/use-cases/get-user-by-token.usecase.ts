import { Injectable } from '@nestjs/common';

import { EntityManager } from 'typeorm';
import { UserLoginsModel } from '../../models/user-logins.model';

@Injectable()
export class GetUserByRefreshTokenUseCase {
  constructor(private readonly globalEntityManager: EntityManager) {}

  public async exec(refreshToken: string, transactionalManager?: EntityManager): Promise<UserLoginsModel> {
    const manager = transactionalManager ?? this.globalEntityManager;

    return manager.getRepository(UserLoginsModel).findOneBy({ refreshToken });
  }
}
