import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { LeagueType } from '../../../../_shared/domain/LeagueType';

@Entity('league')
export default class LeagueEntity extends BaseEntity {
  @PrimaryColumn('uuid')
    id: string;
  @Column()
    name: string;

  @Column()
    type: LeagueType;

  @CreateDateColumn()
    createdAt: Date;

  @UpdateDateColumn()
    updatedAt: Date;

  @DeleteDateColumn({ nullable: true, default: null })
    deletedAt?: Date | null;
}
