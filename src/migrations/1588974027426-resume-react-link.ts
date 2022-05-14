import { MigrationInterface, QueryRunner } from 'typeorm';

const linkList = [
  {
    Type: 1,
    Description: 'Resume application front-end written in React',
    Title: 'Resume in React',
    Url: 'https://resume-react.jeff-rossi.com',
  },
];

export class resumeReactLink1588974027426 implements MigrationInterface {
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
