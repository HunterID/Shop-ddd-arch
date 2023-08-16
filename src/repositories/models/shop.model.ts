import { Column, Entity, JoinColumn, JoinTable, ManyToMany, OneToOne } from 'typeorm';

import { BaseModel } from './base.model';
import { UserModel } from './user.model';
import { TABLE_NAMES } from './constants';

@Entity({ name: TABLE_NAMES.SHOPS })
export class ShopModel extends BaseModel {
  @OneToOne(() => UserModel, { nullable: false })
  @JoinColumn({ name: 'creator_id' })
  creator: UserModel;

  @Column({ type: 'int', nullable: false })
  creatorId: number;

  @ManyToMany(() => UserModel, { nullable: false })
  @JoinTable({
    name: 'shop_users',
    joinColumn: {
      name: 'shop_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
  })
  users: UserModel[];

  @Column({ type: 'varchar', length: 1024, nullable: false })
  name: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 1024, nullable: true })
  avatar: string;
}
