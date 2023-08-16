import { IsPhoneNumber } from 'class-validator';

import { USERS_VALIDATION_MESSAGES } from '../../users.constants';

export class ChangePhoneDto {
  @IsPhoneNumber(null, { message: USERS_VALIDATION_MESSAGES.MOBILE_PHONE_VALID })
  phone: string;
}
