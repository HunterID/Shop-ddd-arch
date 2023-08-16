import { Body, Controller, Post, UseGuards, Headers, Req, Ip } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

import { User } from '../common/decorators/user.decorator';

import { RefreshTokenExistGuard } from './token/guards/refreshToken-exist.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

import { AuthUserResponseDto } from './dto/responseDto/auth-user.dto';
import { CreateUserDto } from '../users/dto/requestDto/create-user.dto';
import { LoginDto } from './dto/requestDto/login.dto';
import { LogoutDto } from './dto/requestDto/logout.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'registration' })
  @Post('registration')
  public async registration(@Body() dto: CreateUserDto, @Ip() ip: string): Promise<AuthUserResponseDto> {
    return this.authService.registration(dto, ip);
  }

  @ApiOperation({ summary: 'login' })
  @Post('login')
  public login(@Body() dto: LoginDto, @Ip() ip: string): Promise<AuthUserResponseDto> {
    return this.authService.login(dto, ip);
  }

  @ApiOperation({ summary: 'logout' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RefreshTokenExistGuard)
  @Post('logout')
  public async logout(
    @Body() { refreshToken }: LogoutDto,
    @User('id', 'accessToken') id: number,
    accessToken: string,
  ): Promise<void> {
    return this.authService.logout(id, accessToken, refreshToken);
  }
}
