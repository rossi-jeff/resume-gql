import { LimitOffsetDeletedDTO } from './limit-offset-deleted.dto';
import { ArgsType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class LimitOffsetDeletedApprovedDTO extends LimitOffsetDeletedDTO {
  @IsOptional()
  @Field({ nullable: true })
  Approved: boolean;
}
