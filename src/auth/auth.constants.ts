export const AUTH_CACHE_CONSTANTS = {
  USER_TOKEN: 'user_token',
  USER_CODE: 'user_code',
  CODE_EXPIRATION_TIME: 1800,
};

export const AUTH_VALIDATION_MESSAGES = {
  DEVICE_ID_UNIQUE: 'device_id_must_be_unique',
  USER_LOGINS_DEVICE_ID: 'device_id_must_be_unique',
  USER_NOT_EXISTS: 'user_with_email_or_phone_not_exists',
  WRONG_CREDENTIALS_PROVIDED: 'wrong_credentials_provided',
  TOKEN_IS_INVALID: 'token_is_invalid',
};
