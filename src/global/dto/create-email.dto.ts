import { ArgsType, Field } from '@nestjs/graphql';
import { EmailTypeEnum } from '../enum';
import { IsOptional } from 'class-validator';

@ArgsType()
export class CreateEmailDto {
  @Field()
  Address: string;

  @IsOptional()
  @Field(type => EmailTypeEnum, { nullable: true })
  Type: EmailTypeEnum;

  @IsOptional()
  @Field({ nullable: true })
  AdminUUID: string;

  @IsOptional()
  @Field({ nullable: true })
  ReferenceUUID: string;
}
