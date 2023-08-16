import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { plainToInstance } from 'class-transformer';

import { UserModel } from '../models/user.model';
import { UserLoginsModel } from '../models/user-logins.model';

import { CreateUserDto } from '../../users/dto/requestDto/create-user.dto';

import { UserToSaveTransform } from './transformations/user-to-save.transform';
import { LoginToSaveTransform } from './transformations/login-to-save.transform';

import { UpdateLoginsUseCase } from './use-cases/update-logins.usecase';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';
import { GetUserLoginUseCase } from './use-cases/get-user-login.usecase';
import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UpdatePasswordUseCase } from './use-cases/update-password.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';
import { UserToUpdateTransform } from './transformations/user-to-update.transform';
import { GetUserByRefreshTokenUseCase } from './use-cases/get-user-by-token.usecase';
import { UpdateLoginsRefreshTokenUseCase } from './use-cases/update-logins-refreshToken.usecase';
import { DeleteUserLoginsUseCase } from './use-cases/delete-user-logins.usecase';

@Injectable()
export class UsersRepositoryService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly updateLoginsUseCase: UpdateLoginsUseCase,
    private readonly getUserByEmailUseCase: GetUserByEmailUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly getUserLoginUseCase: GetUserLoginUseCase,
    private readonly getUserByRefreshTokenUseCase: GetUserByRefreshTokenUseCase,
    private readonly updatePasswordUseCase: UpdatePasswordUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly updateLoginsRefreshTokenUseCase: UpdateLoginsRefreshTokenUseCase,
    private readonly deleteUserLoginsUseCase: DeleteUserLoginsUseCase,
  ) {}

  public async createUser(user: CreateUserDto, transactionalManager?: EntityManager): Promise<UserModel> {
    return this.createUserUseCase.exec(plainToInstance(UserToSaveTransform, user), transactionalManager);
  }

  public async updateUserLogin(loginInfo: LoginToSaveTransform, transactionalManager?: EntityManager): Promise<void> {
    await this.updateLoginsUseCase.exec(plainToInstance(LoginToSaveTransform, loginInfo), transactionalManager);
  }

  public async getUserByEmail(email: string, transactionalManager?: EntityManager): Promise<UserModel> {
    return this.getUserByEmailUseCase.exec(email, transactionalManager);
  }

  public async getUserById(id: number, transactionalManager?: EntityManager): Promise<UserModel> {
    return this.getUserByIdUseCase.exec(id, transactionalManager);
  }

  public async getUserByToken(refreshToken: string): Promise<UserLoginsModel> {
    return this.getUserByRefreshTokenUseCase.exec(refreshToken);
  }

  public async getUserLogin(
    userId: number,
    deviceId: string,
    transactionalManager?: EntityManager,
  ): Promise<UserLoginsModel> {
    return this.getUserLoginUseCase.exec(userId, deviceId, transactionalManager);
  }

  public async updatePassword(userId: number, password: string, transactionalManager?: EntityManager): Promise<void> {
    return this.updateUserUseCase.exec(
      userId,
      plainToInstance(UserToUpdateTransform, { password }),
      transactionalManager,
    );
  }

  public async updateUser(
    userId: number,
    user: UserToUpdateTransform,
    transactionalManager?: EntityManager,
  ): Promise<void> {
    return this.updateUserUseCase.exec(userId, plainToInstance(UserToUpdateTransform, user), transactionalManager);
  }

  public async updateRefreshToken(
    userId: number,
    refreshToken: string,
    transactionalManager?: EntityManager,
  ): Promise<void> {
    return this.updateLoginsRefreshTokenUseCase.exec(userId, refreshToken, transactionalManager);
  }

  public async deleteUserLogins(
    userId: number,
    refreshToken: string,
    transactionalManager?: EntityManager,
  ): Promise<void> {
    return this.deleteUserLoginsUseCase.exec(userId, refreshToken, transactionalManager);
  }
}
