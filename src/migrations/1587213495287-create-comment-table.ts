import { MigrationInterface, QueryRunner, Table } from 'typeorm';
import { CommentTypeEnum } from '../global/enum/comment-type.enum';

export class createCommentTable1587213495287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'comment',
        columns: [
          {
            name: 'Type',
            type: 'enum',
            enum: Object.keys(CommentTypeEnum).filter(
              key => !isNaN(Number(key)),
            ),
            isNullable: true,
          },
          {
            name: 'UUID',
            type: 'varchar',
            length: '40',
            isNullable: true,
          },
          {
            name: 'Message',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Approved',
            type: 'boolean',
            default: false,
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
        name: 'comment',
      }),
      true,
    );
  }
}
