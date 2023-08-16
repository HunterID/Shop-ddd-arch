import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { BaseModel } from './base.model';
import { UserModel } from './user.model';

import { TABLE_NAMES } from './constants';

@Entity({ name: TABLE_NAMES.USER_LOGINS })
export class UserLoginsModel extends BaseModel {
  @ManyToOne(() => UserModel, { nullable: false })
  @JoinColumn({ name: 'user_id' })
  user?: UserModel;

  @Column({ type: 'int', nullable: false })
  userId: number;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  device: string;

  @Column({ type: 'varchar', length: 128, nullable: false, unique: true })
  deviceId: string;

  @Column({ type: 'varchar', length: 1024, nullable: false })
  refreshToken: string;
}
