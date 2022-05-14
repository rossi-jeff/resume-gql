import { MigrationInterface, QueryRunner } from 'typeorm';

const pageNames: string[] = ['home', 'contact', 'links', 'resume'];

export class addBlankPages1587832498799 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    for (const name of pageNames) {
      await queryRunner.query(`INSERT INTO page (Name) values ('${name}')`);
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    for (const name of pageNames) {
      await queryRunner.query(`DELETE FROM page WHERE Name = '${name}'`);
    }
  }
}
