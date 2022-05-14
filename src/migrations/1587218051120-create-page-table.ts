import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

const IndexName = 'IDX-Uniq-Name-on-Page';

export class createPageTable1587218051120 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'page',
        columns: [
          {
            name: 'Name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Content',
            type: 'text',
            isNullable: true,
          },
          // base model columns
          {
            name: 'Id',
            type: 'int',
            length: '11',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'Version',
            type: 'int',
            length: '11',
            isNullable: false,
            default: '1',
          },
          {
            name: 'Created',
            type: 'datetime',
            length: '6',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'Updated',
            type: 'datetime',
            length: '6',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'IsDeleted',
            type: 'boolean',
            default: false,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
    const table = await queryRunner.getTable('page');
    const idxName = table.indices.find(idx => idx.name === IndexName);
    if (!idxName) {
      await queryRunner.createIndex(
        'page',
        new TableIndex({
          name: IndexName,
          columnNames: ['Name'],
          isUnique: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    const table = await queryRunner.getTable('page');
    const idxName = table.indices.find(idx => idx.name === IndexName);
    if (idxName) {
      await queryRunner.dropIndex('page', IndexName);
    }
    await queryRunner.dropTable(
      new Table({
        name: 'page',
      }),
      true,
    );
  }
}
