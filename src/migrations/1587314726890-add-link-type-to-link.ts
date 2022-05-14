import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';
import { LinkTypeEnum } from '../global/enum';

export class addLinkTypeToLink1587314726890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    if (!(await queryRunner.hasColumn('link', 'Type'))) {
      await queryRunner.addColumn(
        'link',
        new TableColumn({
          name: 'Type',
          type: 'enum',
          enum: Object.keys(LinkTypeEnum).filter(key => !isNaN(Number(key))),
          isNullable: true,
        }),
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    if (await queryRunner.hasColumn('link', 'Type')) {
      await queryRunner.dropColumn('link', 'Type');
    }
  }
}
