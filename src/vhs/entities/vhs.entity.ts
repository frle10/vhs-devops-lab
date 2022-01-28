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

  @Column('smallint')
  releasedAt: number;

  @Column('smallint')
  rentalPrice: number;

  @Column('smallint')
  rentalDuration: number;

  @Column('smallint')
  quantity: number;
}
