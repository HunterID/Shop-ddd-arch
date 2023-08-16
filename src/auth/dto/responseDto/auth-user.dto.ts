import { Exclude, Expose } from 'class-transformer';
import { UserResponseDto } from '../../../users/dto/responseDto/user.dto';

@Exclude()
export class AuthUserResponseDto extends UserResponseDto {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
