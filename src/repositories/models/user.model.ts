import { Column, Entity, ManyToMany, JoinTable, Index, OneToMany } from 'typeorm';

import { TABLE_NAMES } from './constants';

import { BaseModel } from './base.model';
import { ShopModel } from './shop.model';
import { UserLoginsModel } from './user-logins.model';

@Entity({ name: TABLE_NAMES.USERS })
export class UserModel extends BaseModel {
  @ManyToMany(() => ShopModel, { nullable: false })
  @JoinTable({
    name: 'shop_users',
    joinColumn: {
      name: 'user_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'company_id',
      referencedColumnName: 'id',
    },
  })
  companies: ShopModel[];

  @Index()
  @Column({ type: 'varchar', length: 1024, nullable: false })
  email: string;

  @OneToMany(() => UserLoginsModel, (userLogin) => userLogin.user)
  userLogins: UserLoginsModel[];

  @Column({ type: 'varchar', length: 512, nullable: false })
  fullname: string;

  @Column({ type: 'varchar', length: 30, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 512, nullable: false })
  password: string;

  @Column({ type: 'varchar', length: 512, nullable: true })
  avatar?: string;
}
