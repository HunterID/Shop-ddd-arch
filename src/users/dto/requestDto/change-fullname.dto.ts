import { IsString, MaxLength, MinLength } from 'class-validator';

import { FULLNAME_MAX_LENGTH, FULLNAME_MIN_LENGTH, USERS_VALIDATION_MESSAGES } from '../../users.constants';

export class ChangeFullnameDto {
  @IsString({ message: USERS_VALIDATION_MESSAGES.FULLNAME_VALID })
  @MinLength(FULLNAME_MIN_LENGTH, { message: USERS_VALIDATION_MESSAGES.FULLNAME_MIN_LENGTH })
  @MaxLength(FULLNAME_MAX_LENGTH, { message: USERS_VALIDATION_MESSAGES.FULLNAME_MAX_LENGTH })
  fullname: string;
}
