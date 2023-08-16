import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { UsersService } from './users.service';

import { User } from '../common/decorators/user.decorator';
import { ChangePasswordDto } from './dto/requestDto/change-password.dto';
import { ChangeEmailDto } from './dto/requestDto/change-email.dto';
import { ChangeAvatarDto } from './dto/requestDto/change-avatar.dto';
import { ChangeFullnameDto } from './dto/requestDto/change-fullname.dto';
import { ChangePhoneDto } from './dto/requestDto/change-phone.dto';
import { UserResponseDto } from './dto/responseDto/user.dto';

@ApiTags('Users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Get profile' })
  @Get('me')
  public async getCurrentUser(@User('id') userId: number): Promise<UserResponseDto> {
    return this.usersService.getCurrentUser(userId);
  }

  @ApiOperation({ summary: 'Update password' })
  @Patch('change-password')
  public async changePassword(@User('id') userId: number, @Body() dto: ChangePasswordDto): Promise<UserResponseDto> {
    return this.usersService.changePassword(userId, dto);
  }

  @ApiOperation({ summary: 'Update email' })
  @Patch('change-email')
  public async changeEmail(@User('id') userId: number, @Body() dto: ChangeEmailDto): Promise<UserResponseDto> {
    return this.usersService.changeEmail(userId, dto.email);
  }

  @ApiOperation({ summary: 'Update phone' })
  @Patch('change-phone')
  public async changePhone(@User('id') userId: number, @Body() dto: ChangePhoneDto): Promise<UserResponseDto> {
    return this.usersService.changePhone(userId, dto.phone);
  }

  @ApiOperation({ summary: 'Update fullname' })
  @Patch('change-fullname')
  public async changeFullname(@User('id') userId: number, @Body() dto: ChangeFullnameDto): Promise<UserResponseDto> {
    return this.usersService.changeFullname(userId, dto.fullname);
  }

  @ApiOperation({ summary: 'Update avatar' })
  @Patch('change-avatar')
  public async changeAvatar(@User('id') userId: number, @Body() dto: ChangeAvatarDto): Promise<UserResponseDto> {
    return this.usersService.changeAvatar(userId, dto.avatar);
  }
}
