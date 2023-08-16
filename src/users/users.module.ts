import { Module } from '@nestjs/common';

import { UsersRepositoryModule } from '../repositories/users/users-repository.module';

import { UsersController } from './users.controller';

import { UsersService } from './users.service';

@Module({
  imports: [UsersRepositoryModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
