import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserModel } from '../../models/user.model';
import { UserToUpdateTransform } from '../transformations/user-to-update.transform';

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly globalEntityManager: EntityManager) {}

  public async exec(id: number, user: UserToUpdateTransform, transactionalManager?: EntityManager): Promise<void> {
    const manager = transactionalManager ?? this.globalEntityManager;

    await manager.getRepository(UserModel).update({ id }, user);
  }
}
