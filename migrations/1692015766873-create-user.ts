import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

import { TABLE_NAMES } from '../src/repositories/models/constants';

const createUsersTable = async (queryRunner: QueryRunner) => {
  await queryRunner.createTable(
    new Table({
      name: TABLE_NAMES.USERS,
      columns: [
        { name: 'id', type: 'int', isPrimary: true, isGenerated: true, isUnique: true },
        { name: 'email', type: 'varchar(1024)', isNullable: false },
        { name: 'fullname', type: 'varchar(512)', isNullable: false },
        { name: 'phone', type: 'varchar(30)', isNullable: true },
        { name: 'password', type: 'varchar(512)', isNullable: false },
        { name: 'avatar', type: 'varchar(512)', isNullable: true },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
      ],
    }),
    true,
  );
};

const addUsersIndexes = async (queryRunner: QueryRunner) => {
  await queryRunner.createIndex(
    TABLE_NAMES.USERS,
    new TableIndex({ name: 'USERS_EMAIL', columnNames: ['email'], isUnique: true }),
  );
  await queryRunner.createIndex(
    TABLE_NAMES.USERS,
    new TableIndex({ name: 'USERS_PHONE', columnNames: ['phone'], isUnique: true }),
  );
};

export class CreateUser1692015766873 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await createUsersTable(queryRunner);
    await addUsersIndexes(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAMES.USERS);
  }
}
