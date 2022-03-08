import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('First')
export class FirstEntity {
  @PrimaryGeneratedColumn({ name: 'ROW' })
  ROW: number;
  //@Column({ name: 'COL_A', type: 'string', length: 50, nullable: false })
  @Column({ name: 'TEXT' })
  TEXT: string;
}
