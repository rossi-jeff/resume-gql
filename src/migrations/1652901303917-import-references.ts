import { MigrationInterface, QueryRunner } from 'typeorm';
import { v4 } from 'uuid';
import { referenceList } from './data/references';
import { Reference } from '../reference/reference.entity';
import { Phone } from '../phone/phone.entity';
import { Email } from '../email/email.entity';
import { Comment } from '../comment/comment.entity';

export class importReferences1652901303917 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const manager = queryRunner.connection;
    const referenceRepo = await manager.getRepository('reference');
    const phoneRepo = await manager.getRepository('phone');
    const emailRepo = await manager.getRepository('email');
    const commentRepo = await manager.getRepository('comment');

    let options: any,
      UUID: string,
      reference: Reference,
      phone: Phone,
      email: Email,
      comment: Comment;

    for (const referenceObj of referenceList) {
      const { Name, Credentials, Title, Company } = referenceObj;
      UUID = v4();
      options = { Name, Credentials, Title, Company, UUID };
      reference = await referenceRepo.save(options);

      if (referenceObj.Phones.length) {
        reference.Phones = [];
        for (const phoneObj of referenceObj.Phones) {
          const { Number, Extension, Type } = phoneObj;
          UUID = v4();
          options = { Number, Extension, Type, UUID };
          phone = await phoneRepo.save(options);
          reference.Phones.push(phone);
        }
      }

      if (referenceObj.Emails.length) {
        reference.Emails = [];
        for (const emailObj of referenceObj.Emails) {
          const { Address, Type } = emailObj;
          UUID = v4();
          options = { Address, Type, UUID };
          email = await emailRepo.save(options);
          reference.Emails.push(email);
        }
      }

      if (referenceObj.Comments.length) {
        reference.Comments = [];
        for (const commentObj of referenceObj.Comments) {
          const { Message, Type } = commentObj;
          UUID = v4();
          options = { Message, Type, UUID };
          comment = await commentRepo.save(options);
          reference.Comments.push(comment);
        }
      }

      await referenceRepo.save(reference); // should make join tables
    }
  }

  public async down(queryRunner: QueryRunner): Promise<any> {}
}
