import { Exclude, Expose, Transform } from 'class-transformer';
import { IsString } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class UploadFileResponse {
  @ApiProperty()
  @Expose()
  @IsString()
  @Transform(({ obj }) => obj.Location)
  url: string;
}
