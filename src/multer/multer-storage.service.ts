import { S3 } from 'aws-sdk';

import { ConfigService } from '@nestjs/config';
import { plainToInstance } from 'class-transformer';
import { BadRequestException, Inject, Injectable } from '@nestjs/common';

import { IMAGES_MIMETYPE_MATCH, IMAGE_VALIDATION_ERRORS, S3_CLIENT } from './multer.constants';
import { UploadFileResponse } from './dto/responseDto/upload-file-response.dto';

@Injectable()
export class MulterStorageService {
  private readonly s3bucketName: string;

  constructor(@Inject(S3_CLIENT) private s3Client: S3, private configService: ConfigService) {
    this.s3bucketName = this.configService.get('s3').bucketName;
  }

  public async _handleFile(req: Request, file: Express.Multer.File, cb): Promise<UploadFileResponse> {
    if (file.mimetype.match(IMAGES_MIMETYPE_MATCH)) {
      const s3Params = {
        Bucket: this.s3bucketName,
        Body: file.stream,
        Key: `${file.originalname}`,
      };
      const uploadImagesS3 = await this.s3Client.upload(s3Params).promise();

      if (!uploadImagesS3) {
        return cb(new BadRequestException(IMAGE_VALIDATION_ERRORS.IMAGE_UPLOAD_ERRORS));
      }
      const composeImage = plainToInstance(UploadFileResponse, uploadImagesS3);

      return cb(null, composeImage);
    } else {
      return cb(new BadRequestException(IMAGE_VALIDATION_ERRORS.WRONG_FILE_TYPE));
    }
  }
}
