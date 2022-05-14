import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class addSlackEventTable1589662568301 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.createTable(
      new Table({
        name: 'slack_event',
        columns: [
          {
            name: 'EventId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'EventTS',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ClientMsgId',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Text',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'SubType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Channel',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ChannelType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'User',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Reaction',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'Team',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'ThreadTS',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'itemType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'itemChannel',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'itemTs',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'previousMessageClientmsgid',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'previousMessageType',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'previousMessageText',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'previousMessageUser',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'previousMessageTeam',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'previousMessageTs',
            type: 'varchar',
            isNullable: true,
          },
          // base model columns
          {
            name: 'Id',
            type: 'int',
            length: '11',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'Version',
            type: 'int',
            length: '11',
            isNullable: false,
            default: '1',
          },
          {
            name: 'Created',
            type: 'datetime',
            length: '6',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'Updated',
            type: 'datetime',
            length: '6',
            isNullable: false,
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'IsDeleted',
            type: 'boolean',
            default: false,
          },
        ],
        engine: 'InnoDB',
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.dropTable(
      new Table({
        name: 'slack_event',
      }),
      true,
    );
  }
}
