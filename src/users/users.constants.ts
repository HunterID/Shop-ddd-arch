export const PASSWORD_SALT_ROUNDS = 10;

export const FULLNAME_MIN_LENGTH = 3;
export const FULLNAME_MAX_LENGTH = 512;

export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 512;

export const REFERRAL_CODE_LENGTH = 21;
export const LANGUAGE_LENGTH = 2;

export const PUSH_NOTIFICATION_TOKEN_LENGTH = 1024;

export const VERIFICATION_CODE_LENGTH = 6;

export const TIMEZONE_MIN_VALUE = -12;
export const TIMEZONE_MAX_VALUE = 14;

export const DEFAULT_USER_REFERRAL_PERCENT = 30;

export const USERS_VALIDATION_MESSAGES = {
  USERS_EMAIL: 'email_must_be_unique',
  USERS_EMAIL_UNIQUE: 'email_must_be_unique',
  USERS_PHONE: 'phone_must_be_unique',

  WRONG_CREDENTIALS_PROVIDED: 'wrong_credentials_provided',

  EMAIL_VALID: 'email_must_be_valid',

  AVATAR_VALID: 'avatar_must_be_valid_url',
  FULLNAME_VALID: 'fullname_must_be_valid_string',
  FULLNAME_MIN_LENGTH: `fullname_must_be_min_${FULLNAME_MIN_LENGTH}_length`,
  FULLNAME_MAX_LENGTH: `fullname_must_be_max_${FULLNAME_MAX_LENGTH}_length`,

  MOBILE_PHONE_VALID: 'mobile_must_be_valid',

  PASSWORD_LOWER_LETTER: 'password_must_contain_lower_letter',
  PASSWORD_UPPER_LETTER: 'password_must_contain_upper_letter',
  PASSWORD_NUMBERS: 'password_must_contain_number',
  PASSWORD_SPACES: 'password_must_not_contain_spaces',
  PASSWORD_SPECIAL_CHARS: 'password_must_contain_special_chars',
  PASSWORD_MIN_LENGTH: `password_must_be_min_${PASSWORD_MIN_LENGTH}_length`,
  PASSWORD_MAX_LENGTH: `password_must_be_max_${PASSWORD_MAX_LENGTH}_length`,
};
