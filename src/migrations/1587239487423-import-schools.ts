import { MigrationInterface, QueryRunner } from 'typeorm';
import { schoolList } from './data/school';

export class importSchools1587239487423 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    for (const schoolData of schoolList) {
      await queryRunner.query(`
				INSERT INTO school (
					Name,
					addressAddress,
					addressSuite,
					addressCity,
					addressState,
					addressZip,
					Program,
					Degree,
					fromMonth,
					fromYear,
					toMonth,
					toYear
				) VALUES (
					'${schoolData.Name}',
					'${schoolData.Address.Address}',
					'${schoolData.Address.Suite}',
					'${schoolData.Address.City}',
					'${schoolData.Address.State}',
					'${schoolData.Address.Zip}',
					'${schoolData.Program}',
					'${schoolData.Degree}',
					'${schoolData.From.Month}',
					'${schoolData.From.Year}',
					'${schoolData.To.Month}',
					'${schoolData.To.Year}'
				)
				`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('SET FOREIGN_KEY_CHECKS=0');
    await queryRunner.query('TRUNCATE TABLE school');
    await queryRunner.query('SET FOREIGN_KEY_CHECKS=1');
  }
}
