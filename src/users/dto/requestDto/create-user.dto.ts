import { IsEmail, IsPhoneNumber, IsString, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

import {
  IsWithoutSpaces,
  mustContainLowerLetter,
  mustContainNumbers,
  mustContainSpecialCharacters,
  mustContainUpperLetter,
} from '../../../common/decorators/password-validation.decorator';

import {
  FULLNAME_MAX_LENGTH,
  FULLNAME_MIN_LENGTH,
  PASSWORD_MAX_LENGTH,
  PASSWORD_MIN_LENGTH,
  USERS_VALIDATION_MESSAGES,
} from '../../users.constants';
import { transformToLowerCase } from '../../../common/helpers/helpers';

export class CreateUserDto {
  @IsEmail({}, { message: USERS_VALIDATION_MESSAGES.EMAIL_VALID })
  @Transform(transformToLowerCase)
  email: string;

  @IsString({ message: USERS_VALIDATION_MESSAGES.FULLNAME_VALID })
  @MinLength(FULLNAME_MIN_LENGTH, { message: USERS_VALIDATION_MESSAGES.FULLNAME_MIN_LENGTH })
  @MaxLength(FULLNAME_MAX_LENGTH, { message: USERS_VALIDATION_MESSAGES.FULLNAME_MAX_LENGTH })
  fullname: string;

  @mustContainLowerLetter({ message: USERS_VALIDATION_MESSAGES.PASSWORD_LOWER_LETTER })
  @mustContainUpperLetter({ message: USERS_VALIDATION_MESSAGES.PASSWORD_UPPER_LETTER })
  @mustContainNumbers({ message: USERS_VALIDATION_MESSAGES.PASSWORD_NUMBERS })
  @IsWithoutSpaces({ message: USERS_VALIDATION_MESSAGES.PASSWORD_SPACES })
  @mustContainSpecialCharacters({ message: USERS_VALIDATION_MESSAGES.PASSWORD_SPECIAL_CHARS })
  @MinLength(PASSWORD_MIN_LENGTH, { message: USERS_VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH })
  @MaxLength(PASSWORD_MAX_LENGTH, { message: USERS_VALIDATION_MESSAGES.PASSWORD_MAX_LENGTH })
  password: string;

  @IsPhoneNumber(null, { message: USERS_VALIDATION_MESSAGES.MOBILE_PHONE_VALID })
  phone: string;
}
