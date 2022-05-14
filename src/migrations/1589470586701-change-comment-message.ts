import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class changeCommentMessage1589470586701 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'comment',
      'Message',
      new TableColumn({
        name: 'Message',
        type: 'text',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.changeColumn(
      'comment',
      'Message',
      new TableColumn({
        name: 'Message',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }
}
