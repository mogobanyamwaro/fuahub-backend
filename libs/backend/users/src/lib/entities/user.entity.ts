import { BaseEntity, USerStatus } from '@mamafuahub/backend/shared';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';
import { Exclude } from 'class-transformer';
import { UserRole } from '@mamafuahub/backend/shared';
import { Field, ObjectType } from '@nestjs/graphql';
// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
import { AccessToken, Attempt, RefreshToken } from '@mamafuahub/backend/auth';

import { Profile } from './profile.entity';

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
  @OneToMany((type) => Attempt, (attempts) => attempts.user)
  @JoinColumn({ name: 'user_id' })
  attempts: Attempt[];

  @OneToMany(() => RefreshToken, (refreshTokens) => refreshTokens.user)
  @JoinColumn({ name: 'user_id' })
  refreshTokens: RefreshToken[];

  @OneToMany(() => AccessToken, (accessTokens) => accessTokens.user)
  @JoinColumn({ name: 'user_id' })
  accessTokens: AccessToken[];
  @OneToOne(() => Profile, (profile) => profile.user, { eager: true })
  @JoinColumn({ name: 'profile_id' })
  profile: Profile;
}
