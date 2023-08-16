import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersRepositoryService } from './users-repository.service';

import { CreateUserUseCase } from './use-cases/create-user.usecase';
import { UpdateLoginsUseCase } from './use-cases/update-logins.usecase';
import { GetUserByIdUseCase } from './use-cases/get-user-by-id.usecase';
import { GetUserByEmailUseCase } from './use-cases/get-user-by-email.usecase';
import { GetUserLoginUseCase } from './use-cases/get-user-login.usecase';
import { UpdatePasswordUseCase } from './use-cases/update-password.usecase';
import { UpdateUserUseCase } from './use-cases/update-user.usecase';

import { UserModel } from '../models/user.model';
import { UserLoginsModel } from '../models/user-logins.model';
import { GetUserByRefreshTokenUseCase } from './use-cases/get-user-by-token.usecase';
import { UpdateLoginsRefreshTokenUseCase } from './use-cases/update-logins-refreshToken.usecase';
import { DeleteUserLoginsUseCase } from './use-cases/delete-user-logins.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel, UserLoginsModel])],
  providers: [
    UsersRepositoryService,
    CreateUserUseCase,
    UpdateLoginsUseCase,
    GetUserByIdUseCase,
    GetUserByEmailUseCase,
    GetUserLoginUseCase,
    GetUserByRefreshTokenUseCase,
    UpdatePasswordUseCase,
    UpdateUserUseCase,
    UpdateLoginsRefreshTokenUseCase,
    DeleteUserLoginsUseCase,
  ],
  exports: [UsersRepositoryService],
})
export class UsersRepositoryModule {}
