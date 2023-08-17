import { Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

import { UsersService } from '../users/users.service';

import { FileInterface } from './interfaces/multer.interface';
import { User } from '../common/decorators/user.decorator';
import { UserResponseDto } from '../users/dto/responseDto/user.dto';

@ApiTags('Users')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('users')
export class MulterController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'upload user avatar to s3' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: 'multipart/form-data',
    required: true,
    schema: {
      type: 'object',
      required: ['file'],
      properties: { file: { type: 'string', format: 'binary' } },
    },
  })
  @Post('upload/avatar')
  @UseInterceptors(FileInterceptor('file'))
  public async uploadImage(@UploadedFile() { url }: FileInterface, @User('id') id: number): Promise<UserResponseDto> {
    return this.userService.changeAvatar(id, url);
  }
}
