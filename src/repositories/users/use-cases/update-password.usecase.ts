import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';

import { UserModel } from '../../models/user.model';
import { PasswordToSaveTransform } from '../transformations/password-to-save.transform';

@Injectable()
export class UpdatePasswordUseCase {
  constructor(private readonly globalEntityManager: EntityManager) {}

  public async exec(updatePasswordData: PasswordToSaveTransform, transactionalManager?: EntityManager): Promise<void> {
    const manager = transactionalManager ?? this.globalEntityManager;

    await manager
      .getRepository(UserModel)
      .update({ id: updatePasswordData.userId }, { password: updatePasswordData.password });
  }
}
