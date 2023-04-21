import { BaseEntity, USerStatus } from '@mamafuahub/backend/shared';
import { Column, Entity } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from '@mamafuahub/backend/shared';
import { Field, ObjectType } from '@nestjs/graphql';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Field()
  @Column({
    name: 'email',
    unique: true,
  })
  email: string;
  @Field()
  @Exclude({ toPlainOnly: true })
  @Column({
    name: 'password',
  })
  password: string;
  @Field()
  @Exclude()
  @Column({
    name: 'email_verification_token',
    nullable: true,
    unique: true,
  })
  emailVerificationToken: string;

  @Column({
    name: 'role',
    type: 'enum',
    enum: UserRole,
    default: UserRole.EMPLOYEE,
  })
  @Field((type) => UserRole)
  role: UserRole;
  @Field((type) => USerStatus, { defaultValue: USerStatus.REVIEW })
  @Column({
    name: 'status',
    type: 'enum',
    enum: USerStatus,
    default: USerStatus.REVIEW,
  })
  status: USerStatus;
}
