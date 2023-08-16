import { Exclude, Expose, Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';

import { PASSWORD_SALT_ROUNDS } from '../../../users/users.constants';
import { transformToLowerCase, trimString } from '../../../common/helpers/helpers';

@Exclude()
export class UserToSaveTransform {
  @Expose()
  @Transform(transformToLowerCase)
  email: string;

  @Expose()
  @Transform(trimString)
  fullname: string;

  @Expose()
  @Transform(({ value }) => bcrypt.hashSync(value, PASSWORD_SALT_ROUNDS))
  password: string;

  @Expose()
  @Transform(trimString)
  phone: string;

  @Expose()
  @Transform(trimString)
  avatar?: string;
}
