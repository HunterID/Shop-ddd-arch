import { IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

import { USERS_VALIDATION_MESSAGES } from '../../users.constants';
import { transformToLowerCase } from '../../../common/helpers/helpers';

export class ChangeEmailDto {
  @IsEmail(null, { message: USERS_VALIDATION_MESSAGES.EMAIL_VALID })
  @Transform(transformToLowerCase)
  email: string;
}
