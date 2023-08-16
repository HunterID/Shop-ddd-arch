import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { RedisService } from '../core/redis/redis.service';

import { AUTH_CACHE_CONSTANTS } from './auth.constants';

@Injectable()
export class AuthCacheService {
  tokenExpirationTime: number;

  constructor(private readonly redisService: RedisService, private readonly configService: ConfigService) {
    this.tokenExpirationTime = this.configService.get('jwt.refreshTokenExpirationTime');
  }

  public async saveAccessTokenToRedis(userId: number, accessToken: string): Promise<void> {
    const multi = this.redisService.multi();

    await this.redisService.sAdd(`${AUTH_CACHE_CONSTANTS.USER_TOKEN}:${userId}`, accessToken, multi);
    await this.redisService.expire(`${AUTH_CACHE_CONSTANTS.USER_TOKEN}:${userId}`, this.tokenExpirationTime, multi);

    await this.redisService.exec(multi);
  }

  public async removeAccessTokenFromRedis(userId: number, accessToken: string): Promise<void> {
    await this.redisService.sRem(`${AUTH_CACHE_CONSTANTS.USER_TOKEN}:${userId}`, accessToken);
  }

  public async isAccessTokenExist(userId: number, accessToken: string): Promise<boolean> {
    const userAccessTokens = await this.redisService.sMembers(`${AUTH_CACHE_CONSTANTS.USER_TOKEN}:${userId}`);

    return userAccessTokens.some((token: string) => token === accessToken);
  }
}
