import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  @Expose()
  fullname: string;

  @Expose()
  phone: string;

  @Expose()
  avatar: string;
}
