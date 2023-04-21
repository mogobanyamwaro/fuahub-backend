import { Field, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  BaseEntity as Base,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BaseEntity extends Base {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Field()
  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt: Date;
  @Field()
  @UpdateDateColumn({
    name: 'updated_at',
  })
  updatedAt: Date;
}
