import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createParameterTable1587219892281 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'parameter',
        columns: [
          {
            name: 'Key',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Value',
            type: 'varchar',
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
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(
      new Table({
        name: 'parameter',
      }),
      true,
    );
  }
}
