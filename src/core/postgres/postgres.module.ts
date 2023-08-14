import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresDbConnectionService } from './postgres-connection.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresDbConnectionService,
    }),
  ],
})
export class PostgresModule {}
