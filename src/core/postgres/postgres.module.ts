import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostgresDbConnectionService } from './postgres-connection.service';
import { TransactionService } from './transaction.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: PostgresDbConnectionService,
    }),
  ],
  providers: [TransactionService],
  exports: [TransactionService],
})
export class PostgresModule {}
