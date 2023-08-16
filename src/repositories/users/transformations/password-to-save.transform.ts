import { Exclude, Expose, Transform } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { PASSWORD_SALT_ROUNDS } from '../../../users/users.constants';

@Exclude()
export class PasswordToSaveTransform {
  @Expose()
  @Transform(({ value }) => bcrypt.hashSync(value, PASSWORD_SALT_ROUNDS))
  password: string;

  @Expose()
  userId: number;
}
