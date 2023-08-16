import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserLoginsModel } from '../../models/user-logins.model';
import { LoginToSaveTransform } from '../transformations/login-to-save.transform';

@Injectable()
export class UpdateLoginsUseCase {
  constructor(private readonly globalEntityManager: EntityManager) {}

  public async exec(loginInfo: LoginToSaveTransform, transactionalManager?: EntityManager): Promise<void> {
    const manager = transactionalManager ?? this.globalEntityManager;

    await manager.getRepository(UserLoginsModel).upsert(loginInfo, ['userId', 'deviceId']);
  }
}
