import { InputType, Field } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class AddressInput {
  @IsOptional()
  @Field({ nullable: true })
  Address: string;

  @IsOptional()
  @Field({ nullable: true })
  Suite: string;

  @IsOptional()
  @Field({ nullable: true })
  City: string;

  @IsOptional()
  @Field({ nullable: true })
  State: string;

  @IsOptional()
  @Field({ nullable: true })
  Zip: string;
}
