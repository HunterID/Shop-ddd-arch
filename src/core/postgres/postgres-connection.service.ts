import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

import { SnakeNamingStrategy } from './snake-naming.strategy';
import { PostgresConfiguration } from '../../../configuration/configuration.types';

@Injectable()
export class PostgresDbConnectionService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    const { host, password, username, port, databaseName, logging }: PostgresConfiguration =
      this.configService.get('postgres');

    return {
      type: 'postgres',
      host,
      port,
      username,
      password,
      database: databaseName,
      logging,
      logger: 'file',
      entities: [`${process.cwd()}/dist/src/repositories/models/*.model.js`],
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
