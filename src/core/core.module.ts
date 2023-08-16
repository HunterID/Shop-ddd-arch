import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

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
    PostgresModule,
    RedisModule,
  ],
  exports: [RedisModule, PostgresModule],
})
export class CoreModule {}
