import { MigrationInterface, QueryRunner } from 'typeorm';
import { jobList } from './data/job';

export class importJobs1587238605800 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    for (const jobData of jobList) {
      await queryRunner.query(`
				INSERT INTO job (
					Company,
					addressAddress,
					addressSuite,
					addressCity,
					addressState,
					addressZip,
					Title,
					Duties,
					fromMonth,
					fromYear,
					toMonth,
					toYear
				) VALUES (
					'${jobData.Company}',
					'${jobData.Address.Address}',
					'${jobData.Address.Suite}',
					'${jobData.Address.City}',
					'${jobData.Address.State}',
					'${jobData.Address.Zip}',
					'${jobData.Title}',
					'${jobData.Duties}',
					'${jobData.From.Month}',
					'${jobData.From.Year}',
					'${jobData.To.Month}',
					'${jobData.To.Year}'
				)
				`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('SET FOREIGN_KEY_CHECKS=0');
    await queryRunner.query('TRUNCATE TABLE job');
    await queryRunner.query('SET FOREIGN_KEY_CHECKS=1');
  }
}
