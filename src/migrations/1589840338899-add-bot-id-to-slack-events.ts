import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class addBotIdToSlackEvents1589840338899 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (!(await queryRunner.hasColumn('slack_event', 'BotId'))) {
      await queryRunner.addColumn(
        'slack_event',
        new TableColumn({
          name: 'BotId',
          type: 'varchar',
          isNullable: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasColumn('slack_event', 'BotId')) {
      await queryRunner.dropColumn('slack_event', 'BotId');
    }
  }
}
