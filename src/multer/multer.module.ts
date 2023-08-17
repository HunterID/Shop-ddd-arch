import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';

import { TokenModule } from '../auth/token/token.module';
import { UsersModule } from '../users/users.module';
import { UsersRepositoryModule } from '../repositories/users/users-repository.module';

import { MulterController } from './multer.controller';
import { S3Provider } from './awsS3.provider';

import { MulterStorageService } from './multer-storage.service';

@Module({
  imports: [
    MulterModule.registerAsync({
      imports: [MulterUploadModule],
      inject: [MulterStorageService],
      useFactory: (multerStorageService: MulterStorageService) => {
        return { storage: multerStorageService };
      },
    }),
    TokenModule,
    UsersModule,
    UsersRepositoryModule,
  ],
  controllers: [MulterController],
  providers: [S3Provider, MulterStorageService],
  exports: [S3Provider, MulterStorageService],
})
export class MulterUploadModule {}
