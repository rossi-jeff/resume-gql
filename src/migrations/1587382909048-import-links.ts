import { MigrationInterface, QueryRunner } from 'typeorm';
import { linkList } from './data/link';

export class importLinks1587382909048 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    for (const linkData of linkList) {
      await queryRunner.query(`
				INSERT INTO link (
					Type,
					Description,
					Title,
					Url
				) VALUES (
					'${linkData.Type}',
					'${linkData.Description}',
					'${linkData.Title}',
					'${linkData.Url}'
				)
				`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('SET FOREIGN_KEY_CHECKS=0');
    await queryRunner.query('TRUNCATE TABLE link');
    await queryRunner.query('SET FOREIGN_KEY_CHECKS=1');
  }
}
