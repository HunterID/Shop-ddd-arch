export type SwaggerConfiguration = {
  isEnabled: boolean;
  user: string;
  password: string;
};

export type JWTConfiguration = {
  accessTokenSecret: string;
  accessTokenExpirationTime: number;
  refreshTokenSecret: string;
  refreshTokenExpirationTime: number;
};

export type PostgresConfiguration = {
  host: string;
  port: number;
  username: string;
  password: string;
  databaseName: string;
  synchronize: boolean;
  logging: boolean;
};

export type RedisConfiguration = {
  host: string;
  port: number;
};

export type Configuration = {
  port: number;
  environment: string;
  jwt: JWTConfiguration;
  postgres: PostgresConfiguration;
  redis: RedisConfiguration;
  swagger: SwaggerConfiguration;
  s3: S3;
};

export type S3 = {
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  bucketName: string;
  endpoint: string;
};
