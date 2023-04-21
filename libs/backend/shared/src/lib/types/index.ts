import { Field, ObjectType } from '@nestjs/graphql';

export interface IDefaultResponse {
  message: string;
  success: boolean;
}
@ObjectType()
export class DefaultResponse implements IDefaultResponse {
  @Field()
  message: string;
  @Field()
  success: boolean;
}
