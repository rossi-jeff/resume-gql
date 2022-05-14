import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { MonthEnum } from '../global/enum/month.enum';

export class createJobTable1587215655095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'job',
        columns: [
          {
            name: 'Company',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Duties',
            type: 'varchar',
            isNullable: true,
          },
          // from and to
          {
            name: 'fromMonth',
            type: 'enum',
            enum: Object.keys(MonthEnum).filter(key => !isNaN(Number(key))),
            isNullable: true,
          },
          {
            name: 'fromYear',
            type: 'int',
            length: '11',
            isNullable: true,
          },
          {
            name: 'toMonth',
            type: 'enum',
            enum: Object.keys(MonthEnum).filter(key => !isNaN(Number(key))),
            isNullable: true,
          },
          {
            name: 'toYear',
            type: 'int',
            length: '11',
            isNullable: true,
          },
          // address embed
          {
            name: 'addressAddress',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressSuite',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressCity',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressState',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'addressZip',
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
        name: 'job',
      }),
      true,
    );
  }
}
