import {
  BaseEntity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  VersionColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';

export abstract class BaseModel extends BaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @CreateDateColumn()
  Created: string;

  @UpdateDateColumn()
  Updated: string;

  @VersionColumn({ type: 'int', default: 1 })
  Version: number;

  @Column({ default: false })
  IsDeleted: boolean;
}
