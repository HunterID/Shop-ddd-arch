import { Exclude, Expose, Transform } from 'class-transformer';

import { trimString } from '../../../common/helpers/helpers';

@Exclude()
export class LoginToSaveTransform {
  @Expose()
  userId: number;

  @Expose()
  @Transform(({ value }) => value && value.trim())
  device?: string;

  @Expose()
  @Transform(trimString)
  deviceId: string;

  @Expose()
  @Transform(trimString)
  refreshToken: string;
}
