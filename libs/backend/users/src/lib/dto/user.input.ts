import { USerStatus, UserRole } from '@mamafuahub/backend/shared';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field((type) => UserRole, { defaultValue: UserRole.EMPLOYEE })
  role: UserRole;
  @Field((type) => USerStatus, { defaultValue: USerStatus.REVIEW })
  status: USerStatus;
}
