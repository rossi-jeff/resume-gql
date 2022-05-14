import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { EmailTypeEnum } from '../global/enum/email-type.enum';

export class createEmailTable1587215110706 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'email',
        columns: [
          {
            name: 'Type',
            type: 'enum',
            enum: Object.keys(EmailTypeEnum).filter(key => !isNaN(Number(key))),
            isNullable: true,
          },
          {
            name: 'Address',
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
        name: 'email',
      }),
      true,
    );
  }
}
