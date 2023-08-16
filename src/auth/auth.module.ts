import { Global, Module } from '@nestjs/common';

import { TokenModule } from './token/token.module';
import { UsersRepositoryModule } from '../repositories/users/users-repository.module';

import { AuthService } from './auth.service';
import { AuthCacheService } from './auth-cache.service';

import { AuthController } from './auth.controller';

@Global()
@Module({
  imports: [UsersRepositoryModule, TokenModule],
  providers: [AuthService, AuthCacheService],
  exports: [TokenModule, AuthCacheService],
  controllers: [AuthController],
})
export class AuthModule {}
