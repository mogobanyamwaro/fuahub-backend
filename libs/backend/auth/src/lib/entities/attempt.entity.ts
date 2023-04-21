import { AttemptType } from '@mamafuahub/backend/shared';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'typeorm';
import { User } from '@mamafuahub/backend/users';

@Entity('attempts')
export class Attempt extends BaseEntity {
  @ManyToOne(() => User, (user) => user.attempts)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({
    name: 'type',
    type: 'enum',
    enum: AttemptType,
  })
  type: AttemptType;

  @Column({
    name: 'ip',
  })
  ip: string;

  @Column({
    name: 'user_agent',
  })
  userAgent: string;
}
