import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { IsIn } from 'class-validator';
import * as bcrypt from 'bcrypt';

import { UserRole } from './user.role.enum';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  @IsIn(Object.values(UserRole))
  role: UserRole;

  @Column('date')
  dateCreated: Date;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}
