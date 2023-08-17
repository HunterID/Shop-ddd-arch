import { Configuration } from './configuration.types';

// eslint-disable-next-line complexity,max-lines-per-function
export default (): Configuration => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  environment: process.env.NODE_ENV || 'development',
  jwt: {
    accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET || 'secret',
    accessTokenExpirationTime: parseInt(process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME) || 28800,
    refreshTokenSecret: process.env.JWT_REFRESH_TOKEN_SECRET || 'secret 2',
    refreshTokenExpirationTime: parseInt(process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME) || 345600,
  },
  postgres: {
    host: process.env.POSTGRES_HOST || '127.0.0.1',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    username: process.env.POSTGRES_USER || 'admin',
    password: process.env.POSTGRES_PASSWORD || 'admin',
    databaseName: process.env.POSTGRES_DB || 'shop-ddd',
    synchronize: process.env.POSTGRES_SYNCHRONIZE === 'true',
    logging: process.env.POSTGRES_LOGGING === 'true',
  },
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: parseInt(process.env.REDIS_PORT, 10) || 6379,
  },
  swagger: {
    isEnabled: process.env.SWAGGER_ENABLED === 'true',
    user: process.env.SWAGGER_USER || 'admin',
    password: process.env.SWAGGER_PASSWORD || 'admin',
  },
  s3: {
    accessKeyId: process.env.S3_ACCESSKEYID || 'secret',
    secretAccessKey: process.env.S3_SECRETACCESSKEY || 'secret2',
    region: process.env.S3_REGION || 'eu-west-1',
    bucketName: process.env.S3_BUCKET_NAME || 'shop-images',
    endpoint: process.env.S3_ENDPOINT || 'http://localhost:4566',
  },
});
