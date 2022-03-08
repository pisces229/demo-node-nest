import { BaseEntity } from './base.entity';
import { IsNotEmpty } from 'class-validator';
import { Column, Entity } from 'typeorm';

@Entity('default')
export class ApplicationEntity extends BaseEntity {
  @Column({
    name: 'CREATE_NO',
    type: 'nvarchar',
    length: 255,
    comment: 'apply name',
  })
  @IsNotEmpty({ message: 'App name cannot be empty' })
  public name: string;
}
