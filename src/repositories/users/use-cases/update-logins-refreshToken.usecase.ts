import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserLoginsModel } from '../../models/user-logins.model';

@Injectable()
export class UpdateLoginsRefreshTokenUseCase {
  constructor(private readonly globalEntityManager: EntityManager) {}

  public async exec(userId: number, refreshToken: string, transactionalManager?: EntityManager): Promise<void> {
    const manager = transactionalManager ?? this.globalEntityManager;

    await manager.getRepository(UserLoginsModel).update({ userId }, { refreshToken });
  }
}
