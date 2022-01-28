import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Vhs extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  genre: string;

  @Column('date')
  releasedAt: Date;

  @Column()
  rentalPrice: number;

  @Column()
  rentalDuration: number;

  @Column()
  quantity: number;
}
