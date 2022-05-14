import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import {
  IdDto,
  CreateCommentDto,
  UpdateCommentDto,
  ApproveCommentDto,
  LimitOffsetDeletedApprovedDTO,
} from '../global/dto';
import { CommentType } from './comment.type';

@Resolver('Comment')
export class CommentResolver {
  constructor(private commentService: CommentService) {}

  @Query(returns => [CommentType])
  async getComments(@Args() getCommentsDto: LimitOffsetDeletedApprovedDTO) {
    return this.commentService.getComments(getCommentsDto);
  }

  @Query(returns => CommentType)
  async showComment(@Args() idDto: IdDto) {
    return this.commentService.showComment(idDto);
  }

  @Mutation(returns => CommentType)
  async createComment(@Args() createCommentDto: CreateCommentDto) {
    return this.commentService.createComment(createCommentDto);
  }

  @Mutation(returns => CommentType)
  async updateComment(@Args() updateCommentDto: UpdateCommentDto) {
    return this.commentService.updateComment(updateCommentDto);
  }

  @Mutation(returns => CommentType)
  async deleteComment(@Args() idDto: IdDto) {
    return this.commentService.deleteComment(idDto);
  }

  @Mutation(returns => CommentType)
  async approveComment(@Args() approveCommentDto: ApproveCommentDto) {
    return this.commentService.approveComment(approveCommentDto);
  }
}
