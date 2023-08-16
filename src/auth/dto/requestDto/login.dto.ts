import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

import { PASSWORD_MAX_LENGTH, PASSWORD_MIN_LENGTH, USERS_VALIDATION_MESSAGES } from '../../../users/users.constants';
import { transformToLowerCase } from '../../../common/helpers/helpers';
import {
  IsWithoutSpaces,
  mustContainLowerLetter,
  mustContainNumbers,
  mustContainSpecialCharacters,
  mustContainUpperLetter,
} from '../../../common/decorators/password-validation.decorator';

export class LoginDto {
  @IsEmail(null, { message: USERS_VALIDATION_MESSAGES.EMAIL_VALID })
  @Transform(transformToLowerCase)
  email: string;

  @mustContainLowerLetter({ message: USERS_VALIDATION_MESSAGES.PASSWORD_LOWER_LETTER })
  @mustContainUpperLetter({ message: USERS_VALIDATION_MESSAGES.PASSWORD_UPPER_LETTER })
  @mustContainNumbers({ message: USERS_VALIDATION_MESSAGES.PASSWORD_NUMBERS })
  @IsWithoutSpaces({ message: USERS_VALIDATION_MESSAGES.PASSWORD_SPACES })
  @mustContainSpecialCharacters({ message: USERS_VALIDATION_MESSAGES.PASSWORD_SPECIAL_CHARS })
  @MinLength(PASSWORD_MIN_LENGTH, { message: USERS_VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: USERS_VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH })
  password: string;
}
