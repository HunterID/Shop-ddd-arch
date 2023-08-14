import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { PostgresModule } from './postgres/postgres.module';

import configuration from '../../configuration/configuration';
import { RedisModule } from './redis/redis.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    JwtModule.register({}),
    PostgresModule,
    RedisModule,
  ],
  exports: [JwtModule.register({}), RedisModule],
})
export class CoreModule {}
