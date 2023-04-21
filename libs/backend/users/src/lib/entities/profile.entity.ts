import { IsDate, IsPhoneNumber } from 'class-validator';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity('profile')
export class Profile {
  @Column({
    name: 'username',
    unique: true,
    nullable: true,
  })
  username: string;

  @Column({
    name: 'contact_phone_number',
    nullable: true,
  })
  contactPhoneNumber?: string;
  @Column({
    name: 'first_name',
    nullable: true,
  })
  firstName?: string;

  @Column({
    name: 'last_name',
    nullable: true,
  })
  lastName?: string;
  @IsPhoneNumber()
  @Column({
    name: 'phone',
    unique: true,
    nullable: true,
  })
  phone?: string;
  @Column({
    name: 'date_of_birth',
    nullable: true,
  })
  dateOfBirth?: Date;
  @IsDate()
  @Column({
    name: 'phone_verified_at',
    nullable: true,
  })
  phoneVerifiedAt: Date;
  @Column({
    name: 'last_seen',
    default: new Date(),
  })
  lastSeen?: Date;
  // @Column({
  //   name: 'marital_status',
  //   type: 'enum',
  //   enum: MaritalStatusType,
  //   nullable: true,
  // })
  // maritalStatus?: MaritalStatusType;
  @OneToOne(() => User, (user) => user.profile)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
