import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class ApproveReferenceDto {
  @Field()
  UUID: string;

  @Field({ nullable: true })
  Approved: boolean;
}
