import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserModel } from '../../models/user.model';
import { UserToSaveTransform } from '../transformations/user-to-save.transform';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly globalEntityManager: EntityManager) {}

  public async exec(user: UserToSaveTransform, transactionalManager?: EntityManager): Promise<UserModel> {
    const manager = transactionalManager ?? this.globalEntityManager;

    return manager.getRepository(UserModel).save(user);
  }
}
