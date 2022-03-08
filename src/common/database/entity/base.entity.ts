import { v4 } from 'uuid';
import { Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude, Transform } from 'class-transformer';

export class BaseEntity {
  @PrimaryColumn({ name: 'ID' })
  // @PrimaryGeneratedColumn({ name: 'ID' })
  id: string = v4();

  @Column({ name: 'CREATE_NO', type: 'datetime', nullable: true })
  @Transform((v) => +v)
  createDate: Date;

  @Exclude()
  @Column({ name: 'CREATE_ID', type: 'varchar', nullable: true })
  createId: string;

  @Column({ name: 'UPDATE_DATE', type: 'datetime', nullable: true })
  @Transform((v) => +v)
  updateDate: Date;

  @Exclude()
  @Column({ name: 'UPDATE_ID', type: 'varchar', nullable: true })
  updateId: string;
}
