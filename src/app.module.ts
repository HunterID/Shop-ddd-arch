import { Module } from '@nestjs/common';

import { CoreModule } from './core/core.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { MulterUploadModule } from './multer/multer.module';

@Module({
  imports: [CoreModule, UsersModule, AuthModule, MulterUploadModule],
})
export class AppModule {}
