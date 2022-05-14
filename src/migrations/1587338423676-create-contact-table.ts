import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import {
  PreferredContact,
  PhoneTypeEnum,
  EmailTypeEnum,
  Salutation,
} from '../global/enum';

export class createContactTable1587338423676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'contact',
        columns: [
          {
            name: 'Subject',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Message',
            type: 'varchar',
            isNullable: true,
          },
          // preferred
          {
            name: 'Preferred',
            type: 'enum',
            enum: Object.keys(PreferredContact).filter(
              key => !isNaN(Number(key)),
            ),
            isNullable: true,
          },
          // phone
          {
            name: 'PhoneType',
            type: 'enum',
            enum: Object.keys(PhoneTypeEnum).filter(key => !isNaN(Number(key))),
            isNullable: true,
          },
          {
            name: 'Phone',
            type: 'varchar',
            isNullable: true,
          },
          // email
          {
            name: 'EmailType',
            type: 'enum',
            enum: Object.keys(EmailTypeEnum).filter(key => !isNaN(Number(key))),
            isNullable: true,
          },
          {
            name: 'Email',
            type: 'varchar',
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
        name: 'contact',
      }),
      true,
    );
  }
}
