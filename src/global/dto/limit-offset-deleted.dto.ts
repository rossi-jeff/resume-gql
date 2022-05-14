import { LimitOffsetDto } from './limit-offset.dto';
import { Field, ArgsType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@ArgsType()
export class LimitOffsetDeletedDTO extends LimitOffsetDto {
  @IsOptional()
  @Field({ nullable: true })
  IsDeleted: boolean;
}
