import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '@mamafuahub/backend/shared';
import { User } from '@mamafuahub/backend/users';

@Entity('refresh_tokens')
export class RefreshToken extends BaseEntity {
  @ManyToOne(() => User, (user) => user.refreshTokens)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'token',
  })
  token: string;

  @Column({
    name: 'expires_at',
  })
  expiresAt: Date;

  @Column({
    name: 'revoked',
    default: false,
  })
  revoked: boolean;
}
