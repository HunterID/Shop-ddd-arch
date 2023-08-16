import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';
import { TABLE_NAMES } from '../src/repositories/models/constants';

const createShopsTable = async (queryRunner: QueryRunner) => {
  await queryRunner.createTable(
    new Table({
      name: TABLE_NAMES.SHOPS,
      columns: [
        { name: 'id', type: 'int', isPrimary: true, isGenerated: true, isUnique: true },
        { name: 'name', type: 'varchar(1024)', isNullable: false },
        { name: 'avatar', type: 'varchar(1024)', isNullable: true },
        { name: 'email', type: 'varchar(1024)', isNullable: true },
        { name: 'creator_id', type: 'int', isNullable: false },
        { name: 'created_at', type: 'timestamp', default: 'now()' },
        { name: 'updated_at', type: 'timestamp', default: 'now()' },
      ],
    }),
    true,
  );
};

const addShopsIndexes = async (queryRunner: QueryRunner) => {
  await queryRunner.createIndex(
    TABLE_NAMES.SHOPS,
    new TableIndex({ name: 'SHOP_NAME', columnNames: ['name'], isUnique: false }),
  );
  await queryRunner.createForeignKey(
    TABLE_NAMES.SHOPS,
    new TableForeignKey({
      columnNames: ['creator_id'],
      referencedColumnNames: ['id'],
      referencedTableName: TABLE_NAMES.USERS,
      onDelete: 'CASCADE',
    }),
  );
};

export class CreateShop1692016582116 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await createShopsTable(queryRunner);
    await addShopsIndexes(queryRunner);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAMES.SHOPS);
  }
}
