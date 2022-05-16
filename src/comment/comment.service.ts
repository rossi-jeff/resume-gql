import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from './comment.entity';
import { Repository } from 'typeorm';
import {
  IdDto,
  CreateCommentDto,
  UpdateCommentDto,
  ApproveCommentDto,
  LimitOffsetDeletedApprovedDTO,
} from '../global/dto';
import { DefaultLimit, EmailJsUrl } from '../global/constants';
import { NotFound } from '../global/error';
import * as _ from 'lodash';
import { AdminService } from '../admin/admin.service';
import { ReferenceService } from '../reference/reference.service';
import { VisitorService } from '../visitor/visitor.service';
import { EmailJsMessage } from '../global/type';
import fetch from 'node-fetch';

@Injectable()
export class CommentService {
  private entity: any = Comment;
  private relations: string[] = ['Admins', 'References', 'Visitors'];
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
    private adminService: AdminService,
    private referenceService: ReferenceService,
    private visitorService: VisitorService,
  ) {}

  async getComments(
    getCommentsDto: LimitOffsetDeletedApprovedDTO,
  ): Promise<Comment[]> {
    const { Limit, Offset, IsDeleted, Approved } = getCommentsDto;
    const options: any = {
      where: {
        IsDeleted: IsDeleted || false,
        Approved: _.has(getCommentsDto, 'Approved') ? Approved : true,
      },
      take: Limit || DefaultLimit,
      skip: Offset || 0,
      relations: this.relations,
    };
    return this.commentRepository.find(options);
  }

  async showComment(idDto: IdDto): Promise<Comment> {
    const { Id } = idDto;
    const found = await this.commentRepository.findOne(Id, {
      relations: this.relations,
    });
    if (!found) throw NotFound(this.entity, Id);
    return found;
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const comment = new Comment();
    let parent: any, manager: any;
    const {
      Type,
      Message,
      AdminUUID,
      ReferenceUUID,
      VisitorUUID,
    } = createCommentDto;
    _.merge(comment, { Type, Message });
    await this.commentRepository.save(comment);
    try {
      if (AdminUUID || ReferenceUUID || VisitorUUID) {
        manager = this.commentRepository.manager;
        if (AdminUUID) {
          parent = await this.adminService.showAdmin({ UUID: AdminUUID });
          await manager.query(
            'INSERT INTO admin_comment (commentId, adminId) VALUES (?,?)',
            [comment.Id, parent.Id],
          );
        }
        if (ReferenceUUID) {
          parent = await this.referenceService.showReference({
            UUID: ReferenceUUID,
          });
          await manager.query(
            'INSERT INTO reference_comment (commentId, referenceId) VALUES (?,?)',
            [comment.Id, parent.Id],
          );
        }
        if (VisitorUUID) {
          parent = await this.visitorService.showVisitor({ UUID: VisitorUUID });
          await manager.query(
            'INSERT INTO visitor_comment (commentId, visitorId) VALUES (?,?)',
            [comment.Id, parent.Id],
          );
        }
      }
    } catch (e) {
      console.log(e);
    }
    try {
      // await this.mailer.send(this.buildMessage(comment, 'Create'));
      const message = this.buildMessage(comment, 'Create');
      const response = await fetch(EmailJsUrl, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    return comment;
  }

  async updateComment(updateCommentDto: UpdateCommentDto): Promise<Comment> {
    const { Id, ...updates } = updateCommentDto;
    const comment = await this.showComment({ Id });
    if (!_.isEmpty(updates)) _.merge(comment, updates);
    try {
      // await this.mailer.send(this.buildMessage(comment, 'Update'));
      const message = this.buildMessage(comment, 'Update');
      const response = await fetch(EmailJsUrl, {
        method: 'POST',
        body: JSON.stringify(message),
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response);
    } catch (e) {
      console.log(e);
    }
    return this.commentRepository.save(comment);
  }

  async deleteComment(idDto: IdDto): Promise<Comment> {
    const comment = await this.showComment(idDto);
    comment.IsDeleted = true;
    comment.Admins = [];
    comment.References = [];
    comment.Visitors = [];
    return this.commentRepository.save(comment);
  }

  async approveComment(approveCommentDto: ApproveCommentDto): Promise<Comment> {
    const { Id, Approved } = approveCommentDto;
    const comment = await this.showComment({ Id });
    comment.Approved = Approved;
    return this.commentRepository.save(comment);
  }

  private buildMessage(comment: Comment, action: string) {
    const message = new EmailJsMessage();
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.service_id = process.env.EMAIL_JS_SERVICE_ID;
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.template_id = process.env.EMAIL_JS_COMMENT_TEMPLATE_ID;
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.user_id = process.env.EMAIL_JS_USER_ID;
    // eslint-disable-next-line @typescript-eslint/camelcase
    message.template_params = {};
    message.template_params['Action'] = `${action} Comment`;
    message.template_params['Type'] = comment.Type;
    message.template_params['Message'] = comment.Message;
    return message;
  }
}
