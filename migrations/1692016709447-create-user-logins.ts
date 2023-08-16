import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

import { TABLE_NAMES } from '../src/repositories/models/constants';

const createUserLoginsTable = async (queryRunner: QueryRunner) => {
  await queryRunner.createTable(
    new Table({
      name: TABLE_NAMES.USER_LOGINS,
      columns: [
        { name: 'id', type: 'int', isPrimary: true, isGenerated: true, isUnique: true },
        { name: 'user_id', type: 'int', isNullable: false },
        { name: 'device', type: 'varchar(1024)', isNullable: true },
        { name: 'device_id', type: 'varchar(128)', isNullable: false },
        { name: 'refresh_token', type: 'varchar(1024)', isNullable: false },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
      ],
    }),
    true,
  );
};

const addUserLoginsIndexes = async (queryRunner: QueryRunner) => {
  await queryRunner.createForeignKey(
    TABLE_NAMES.USER_LOGINS,
    new TableForeignKey({
      columnNames: ['user_id'],
      referencedColumnNames: ['id'],
      referencedTableName: 'users',
      onDelete: 'CASCADE',
    }),
  );
  await queryRunner.createIndex(
    TABLE_NAMES.USER_LOGINS,
    new TableIndex({ name: 'USER_LOGINS_USER_ID_DEVICE_ID', columnNames: ['user_id', 'device_id'], isUnique: true }),
  );
  await queryRunner.createIndex(
    TABLE_NAMES.USER_LOGINS,
    new TableIndex({ name: 'USER_LOGINS_DEVICE_ID', columnNames: ['device_id'], isUnique: true }),
  );
};

export class CreateUserLogins1692016709447 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await createUserLoginsTable(queryRunner);
    await addUserLoginsIndexes(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAMES.USER_LOGINS);
  }
}
