import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { Salutation } from '../global/enum/salutation.enum';

export class createAdminTable1587209505403 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'admin',
        columns: [
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

          // user columns
          {
            name: 'UUID',
            type: 'varchar',
            length: '40',
            isNullable: true,
          },
          // name embed
          {
            name: 'nameSalutation',
            type: 'enum',
            enum: Object.keys(Salutation).filter(key => !isNaN(Number(key))),
            isNullable: true,
          },
          {
            name: 'nameFirst',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nameMiddle',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nameLast',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'nameSuffix',
            type: 'varchar',
            isNullable: true,
          },
          // credentials embed
          {
            name: 'credentialsUsername',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'credentialsPassword',
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
        name: 'admin',
      }),
      true,
    );
  }
}
