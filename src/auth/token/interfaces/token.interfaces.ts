export interface JwtTokens {
  accessToken: string;
  refreshToken: string;
}

export enum JwtSignOptionEnum {
  AccessToken = 'AccessToken',
  RefreshToken = 'RefreshToken',
}

export interface PayloadTokenInterface {
  userId: number;
  iat: number;
  exp: number;
}
