import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Vhs } from '../../vhs/entities/vhs.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Rental extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('date')
  rented_at: Date;

  @Column('date')
  expired_at: Date;

  @Column('date', { nullable: true })
  returned_at: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Vhs)
  vhs: Vhs;
}
