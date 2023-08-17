import { IsUrl, ValidateIf } from 'class-validator';

import { USERS_VALIDATION_MESSAGES } from '../../users.constants';

export class ChangeAvatarDto {
  @ValidateIf(({ avatar }) => !!avatar)
  @IsUrl({}, { message: USERS_VALIDATION_MESSAGES.AVATAR_VALID })
  avatar: string;
}
