import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';
import { adminData, adminEmails, adminPhones } from './data/admin';

let adminId: number,
  phoneId: number,
  emailId: number,
  adminResult: any,
  childResult: any;

export class importAdmin1587229573704 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    adminResult = await queryRunner.query(`
			INSERT INTO admin (
				nameSalutation,
				nameFirst,
				nameMiddle,
				nameLast,
				nameSuffix,
				credentialsUsername,
				addressAddress,
				addressSuite,
				addressCity,
				addressState,
				addressZip,
				UUID
			) VALUES (
				'${adminData.Name.Salutation}',
				'${adminData.Name.First}',
				'${adminData.Name.Middle}',
				'${adminData.Name.Last}',
				'${adminData.Name.Suffix}',
				'${adminData.Credentials.Username}',
				'${adminData.Address.Address}',
				'${adminData.Address.Suite}',
				'${adminData.Address.City}',
				'${adminData.Address.State}',
				'${adminData.Address.Zip}',
				'${v4()}'
			)
			`);
    adminId = adminResult.insertId;

    for (const emailData of adminEmails) {
      childResult = await queryRunner.query(`
				INSERT INTO email (
					Type,
					Address
				) VALUES (
					'${emailData.Type}',
					'${emailData.Address}'
				)
				`);
      emailId = childResult.insertId;
      await queryRunner.query(
        `INSERT INTO admin_email (adminId,emailId) VALUES (${adminId},${emailId})`,
      );
    }

    for (const phoneData of adminPhones) {
      childResult = await queryRunner.query(`
				INSERT INTO phone (
					Type,
					Number,
					Extension
				) VALUES (
					'${phoneData.Type}',
					'${phoneData.Number}',
					'${phoneData.Extension}'
				)
				`);
      phoneId = childResult.insertId;
      await queryRunner.query(
        `INSERT INTO admin_phone (adminId,phoneId) VALUES (${adminId},${phoneId})`,
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('SET FOREIGN_KEY_CHECKS=0');
    adminResult = await queryRunner.query(
      `SELECT Id FROM admin WHERE credentialsUsername = '${adminData.Credentials.Username}'`,
    );
    adminId = adminResult[0].Id;
    await queryRunner.query(
      `DELETE FROM admin_email WHERE adminId = ${adminId}`,
    );
    await queryRunner.query(
      `DELETE FROM admin_phone WHERE adminId = ${adminId}`,
    );
    await queryRunner.query(`DELETE FROM admin WHERE Id = ${adminId}`);
    for (const emailData of adminEmails) {
      await queryRunner.query(
        `DELETE FROM email WHERE Address = '${emailData.Address}'`,
      );
    }
    for (const phoneData of adminPhones) {
      await queryRunner.query(
        `DELETE FROM phone WHERE Number = '${phoneData.Number}'`,
      );
    }
    await queryRunner.query('SET FOREIGN_KEY_CHECKS=1');
  }
}
