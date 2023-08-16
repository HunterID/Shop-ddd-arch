import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

import { plainToInstance } from 'class-transformer';

import { AuthCacheService } from '../auth-cache.service';
import { UsersRepositoryService } from '../../repositories/users/users-repository.service';

import { JwtSignOptionEnum, PayloadTokenInterface } from './interfaces/token.interfaces';
import { TokenResponseDto } from './dto/responseDto/tokens.dto';

@Injectable()
export class TokenService {
  private [JwtSignOptionEnum.AccessToken]: JwtSignOptions;
  private [JwtSignOptionEnum.RefreshToken]: JwtSignOptions;

  constructor(
    private readonly usersRepositoryService: UsersRepositoryService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly authCacheService: AuthCacheService,
  ) {
    this.configureJwtSignOptions();
  }

  private configureJwtSignOptions = () => {
    const { accessTokenSecret, accessTokenExpirationTime, refreshTokenSecret, refreshTokenExpirationTime } =
      this.configService.get('jwt');

    this[JwtSignOptionEnum.AccessToken] = {
      secret: accessTokenSecret,
      expiresIn: accessTokenExpirationTime,
    };

    this[JwtSignOptionEnum.RefreshToken] = {
      secret: refreshTokenSecret,
      expiresIn: refreshTokenExpirationTime,
    };
  };

  public composeAccessToken(userId: number): string {
    return this.composeToken(userId, JwtSignOptionEnum.AccessToken);
  }

  public composeRefreshToken(userId: number): string {
    return this.composeToken(userId, JwtSignOptionEnum.RefreshToken);
  }

  public composeToken(userId: number, jwtSignOptionsName: JwtSignOptionEnum): string {
    return this.jwtService.sign({ userId }, this[jwtSignOptionsName]);
  }

  public async composeTokens(userId: number): Promise<TokenResponseDto> {
    return plainToInstance(TokenResponseDto, {
      accessToken: this.composeAccessToken(userId),
      refreshToken: this.composeRefreshToken(userId),
    });
  }

  public async verifyToken(token: string): Promise<{ userId: number }> {
    return this.jwtService.verifyAsync(token, this[JwtSignOptionEnum.AccessToken]);
  }

  public async updateAccessToken(userId: number): Promise<{
    accessToken: string;
  }> {
    const accessToken = this.composeAccessToken(userId);

    await this.authCacheService.saveAccessTokenToRedis(userId, accessToken);

    return { accessToken: accessToken };
  }

  public async updateRefreshToken(userId: number): Promise<TokenResponseDto> {
    const tokens = await this.composeTokens(userId);

    await Promise.all([
      this.authCacheService.saveAccessTokenToRedis(userId, tokens.accessToken),
      this.usersRepositoryService.updateRefreshToken(userId, tokens.refreshToken),
    ]);

    return plainToInstance(TokenResponseDto, tokens);
  }

  public async removeRefreshToken(userId: number, refreshToken: string): Promise<void> {
    await this.usersRepositoryService.deleteUserLogins(userId, refreshToken);
  }

  public decodeToken(token: string): PayloadTokenInterface {
    return this.jwtService.decode(token) as PayloadTokenInterface;
  }
}
