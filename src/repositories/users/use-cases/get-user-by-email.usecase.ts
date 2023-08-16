import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserModel } from '../../models/user.model';

@Injectable()
export class GetUserByEmailUseCase {
  constructor(private readonly globalEntityManager: EntityManager) {}

  public async exec(email: string, transactionalManager?: EntityManager): Promise<UserModel> {
    const manager = transactionalManager ?? this.globalEntityManager;

    return manager.getRepository(UserModel).findOneBy({ email });
  }
}
