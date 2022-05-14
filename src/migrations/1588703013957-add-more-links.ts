import { MigrationInterface, QueryRunner } from 'typeorm';
import { linkList } from './data/more-links';

export class addMoreLinks1588703013957 implements MigrationInterface {
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
    for (const linkData of linkList) {
      await queryRunner.query(
        `DELETE FROM link WHERE Title = '${linkData.Title}'`,
      );
    }
  }
}
