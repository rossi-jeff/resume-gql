import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class dropSlackTables1652537604990 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropTable(
            new Table({
                name: 'slack_channel',
            }),
            true,
        );
        await queryRunner.dropTable(
            new Table({
                name: 'slack_event',
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
