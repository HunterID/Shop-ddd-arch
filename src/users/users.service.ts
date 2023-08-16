import { BadRequestException, Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { plainToInstance } from 'class-transformer';

import { UsersRepositoryService } from '../repositories/users/users-repository.service';

import { USERS_VALIDATION_MESSAGES } from './users.constants';

import { UserResponseDto } from './dto/responseDto/user.dto';
import { ChangePasswordDto } from './dto/requestDto/change-password.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepositoryService: UsersRepositoryService) {}

  public async getCurrentUser(id: number): Promise<UserResponseDto> {
    const user = await this.usersRepositoryService.getUserById(id);

    return plainToInstance(UserResponseDto, user);
  }

  public async changePassword(userId: number, dto: ChangePasswordDto): Promise<UserResponseDto> {
    const user = await this.usersRepositoryService.getUserById(userId);

    if (!bcrypt.compareSync(dto.oldPassword, user.password)) {
      throw new BadRequestException(USERS_VALIDATION_MESSAGES.WRONG_CREDENTIALS_PROVIDED);
    }

    await this.usersRepositoryService.updatePassword(userId, dto.newPassword);

    return plainToInstance(UserResponseDto, user);
  }

  public async changeEmail(userId: number, email: string): Promise<UserResponseDto> {
    const user = await this.usersRepositoryService.getUserById(userId);

    if (user.email !== email) {
      try {
        await this.usersRepositoryService.updateUser(userId, { email });
      } catch (error) {
        if (USERS_VALIDATION_MESSAGES[error.constraint]) {
          throw new BadRequestException(USERS_VALIDATION_MESSAGES[error.constraint]);
        }
        throw error;
      }
    }

    return plainToInstance(UserResponseDto, { ...user, email });
  }

  public async changePhone(userId: number, phone: string): Promise<UserResponseDto> {
    const user = await this.usersRepositoryService.getUserById(userId);

    if (user.phone !== phone) {
      try {
        await this.usersRepositoryService.updateUser(userId, { phone });
      } catch (error) {
        if (USERS_VALIDATION_MESSAGES[error.constraint]) {
          throw new BadRequestException(USERS_VALIDATION_MESSAGES[error.constraint]);
        }
        throw error;
      }
    }

    return plainToInstance(UserResponseDto, { ...user, phone });
  }

  public async changeFullname(userId: number, fullname: string): Promise<UserResponseDto> {
    await this.usersRepositoryService.updateUser(userId, { fullname });
    const user = await this.usersRepositoryService.getUserById(userId);

    return plainToInstance(UserResponseDto, user);
  }

  public async changeAvatar(userId: number, avatar: string): Promise<UserResponseDto> {
    await this.usersRepositoryService.updateUser(userId, { avatar });
    const user = await this.usersRepositoryService.getUserById(userId);

    return plainToInstance(UserResponseDto, user);
  }
}
