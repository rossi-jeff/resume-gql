import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableForeignKey,
} from 'typeorm';

const table1 = 'reference';
const table2 = 'phone';
const key1 = `${table1}Id`;
const key2 = `${table2}Id`;
const tableName = `${table1}_${table2}`;

export class createJoinTableReferencePhone1587228076059
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: tableName,
        columns: [
          {
            name: key1,
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
          {
            name: key2,
            type: 'int',
            isNullable: false,
            isPrimary: true,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable(tableName);
    const indexKey1 = table.indices.find(idx => idx.name === `IDX-${key1}`);
    if (!indexKey1) {
      await queryRunner.createIndex(
        tableName,
        new TableIndex({
          name: `IDX-${key1}`,
          columnNames: [key1],
          isUnique: false,
        }),
      );
    }
    const indexKey2 = table.indices.find(idx => idx.name === `IDX-${key2}`);
    if (!indexKey2) {
      await queryRunner.createIndex(
        tableName,
        new TableIndex({
          name: `IDX-${key2}`,
          columnNames: [key2],
          isUnique: false,
        }),
      );
    }
    const foreignKey1 = table.foreignKeys.find(
      fk => fk.columnNames.indexOf(key1) !== -1,
    );
    if (!foreignKey1) {
      await queryRunner.createForeignKey(
        tableName,
        new TableForeignKey({
          name: `FK-${tableName}-${table1}`,
          columnNames: [key1],
          referencedColumnNames: ['Id'],
          referencedTableName: table1,
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
    const foreignKey2 = table.foreignKeys.find(
      fk => fk.columnNames.indexOf(key2) !== -1,
    );
    if (!foreignKey2) {
      await queryRunner.createForeignKey(
        tableName,
        new TableForeignKey({
          name: `FK-${tableName}-${table2}`,
          columnNames: [key2],
          referencedColumnNames: ['Id'],
          referencedTableName: table2,
          onDelete: 'CASCADE',
          onUpdate: 'NO ACTION',
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable(tableName);
    const foreignKey1 = table.foreignKeys.find(
      fk => fk.columnNames.indexOf(key1) !== -1,
    );
    if (foreignKey1) {
      await queryRunner.dropForeignKey(tableName, foreignKey1);
    }
    const foreignKey2 = table.foreignKeys.find(
      fk => fk.columnNames.indexOf(key2) !== -1,
    );
    if (foreignKey2) {
      await queryRunner.dropForeignKey(tableName, foreignKey2);
    }
    const indexKey1 = table.indices.find(idx => idx.name === `IDX-${key1}`);
    if (indexKey1) {
      await queryRunner.dropIndex(tableName, `IDX-${key1}`);
    }
    const indexKey2 = table.indices.find(idx => idx.name === `IDX-${key2}`);
    if (indexKey2) {
      await queryRunner.dropIndex(tableName, `IDX-${key2}`);
    }
    await queryRunner.dropTable(
      new Table({
        name: tableName,
      }),
      true,
    );
  }
}
