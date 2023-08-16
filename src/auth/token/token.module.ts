import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { TokenController } from './token.controller';

import { TokenService } from './token.service';

import { UsersRepositoryModule } from '../../repositories/users/users-repository.module';

@Module({
  imports: [JwtModule.register({}), UsersRepositoryModule],
  controllers: [TokenController],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
