import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';

import { plainToInstance } from 'class-transformer';
import { EntityManager } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UserModel } from '../repositories/models/user.model';
import { UserLoginsModel } from '../repositories/models/user-logins.model';

import { UsersRepositoryService } from '../repositories/users/users-repository.service';
import { TransactionService } from '../core/postgres/transaction.service';

import { USERS_VALIDATION_MESSAGES } from '../users/users.constants';
import { CreateUserDto } from '../users/dto/requestDto/create-user.dto';
import { AUTH_VALIDATION_MESSAGES } from './auth.constants';
import { LoginDto } from './dto/requestDto/login.dto';
import { TokenService } from './token/token.service';
import { AuthCacheService } from './auth-cache.service';
import { AuthUserResponseDto } from './dto/responseDto/auth-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly tokenService: TokenService,
    private readonly authCacheService: AuthCacheService,
    private readonly usersRepositoryService: UsersRepositoryService,
  ) {}

  public async registration(dto: CreateUserDto, ip: string): Promise<AuthUserResponseDto> {
    return this.transactionService.exec<AuthUserResponseDto>(async (transactionalManager) => {
      const user = await this.createUser(dto, transactionalManager);

      const tokens = await this.tokenService.composeTokens(user.id);

      await Promise.all([
        this.authCacheService.saveAccessTokenToRedis(user.id, tokens.accessToken),
        this.addLoginData(ip, user.id, tokens.refreshToken, transactionalManager),
      ]);

      return plainToInstance(AuthUserResponseDto, {
        ...user,
        ...tokens,
      });
    });
  }

  public async login(dto: LoginDto, ip: string): Promise<AuthUserResponseDto> {
    const user = await this.usersRepositoryService.getUserByEmail(dto.email);

    if (!bcrypt.compareSync(dto.password, user?.password || '')) {
      throw new BadRequestException(AUTH_VALIDATION_MESSAGES.WRONG_CREDENTIALS_PROVIDED);
    }

    const tokens = await this.tokenService.composeTokens(user.id);

    await Promise.all([
      this.authCacheService.saveAccessTokenToRedis(user.id, tokens.accessToken),
      this.addLoginData(ip, user.id, tokens.refreshToken),
    ]);

    return plainToInstance(AuthUserResponseDto, { ...user, ...tokens });
  }

  public async logout(userId: number, accessToken: string, refreshToken: string): Promise<void> {
    try {
      await Promise.all([
        this.usersRepositoryService.deleteUserLogins(userId, refreshToken),
        this.authCacheService.removeAccessTokenFromRedis(userId, accessToken),
      ]);
    } catch (error) {
      throw new UnauthorizedException();
    }
  }

  private async createUser(dto: CreateUserDto, transactionalManager?: EntityManager): Promise<UserModel> {
    let user;

    try {
      user = await this.usersRepositoryService.createUser(dto, transactionalManager);
    } catch (error) {
      const validationMessage =
        USERS_VALIDATION_MESSAGES[error.constraint] || AUTH_VALIDATION_MESSAGES[error.constraint];
      if (validationMessage) {
        throw new BadRequestException(validationMessage);
      }
      throw error;
    }

    return user;
  }

  private async addLoginData(
    ip: string,
    userId: number,
    refreshToken: string,
    transactionalManager?: EntityManager,
  ): Promise<void> {
    try {
      await this.usersRepositoryService.updateUserLogin(
        {
          userId,
          deviceId: ip,
          refreshToken,
        },
        transactionalManager,
      );
    } catch (error) {
      const validationMessage =
        USERS_VALIDATION_MESSAGES[error.constraint] || AUTH_VALIDATION_MESSAGES[error.constraint];
      if (validationMessage) {
        throw new BadRequestException(AUTH_VALIDATION_MESSAGES[error.constraint]);
      }
      throw error;
    }
  }
}
