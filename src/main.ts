import helmet from 'helmet';
import * as basicAuth from 'express-basic-auth';

import { NestFactory } from '@nestjs/core';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, OpenAPIObject, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { SwaggerConfiguration } from '../configuration/configuration.types';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);
  await initializeApp(app);
}

const createValidationPipe = (): ValidationPipe => {
  return new ValidationPipe({
    transform: true,
    whitelist: true,
  });
};

const initializeApp = async (app: INestApplication): Promise<void> => {
  const configService = app.get(ConfigService);
  const port = configService.get('port');

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(createValidationPipe());
  setupSwagger(app);

  await app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
};

const composeSwaggerDocument = (app: INestApplication): OpenAPIObject => {
  const options = new DocumentBuilder()
    .setTitle('Shop-add-arch')
    .setVersion('1.0')
    .addBearerAuth({ type: 'http', in: 'header' })
    .build();

  return SwaggerModule.createDocument(app, options);
};

const setupSwagger = (app: INestApplication): void => {
  const configService = app.get(ConfigService);
  const { isEnabled, user, password }: SwaggerConfiguration = configService.get('swagger');

  if (isEnabled) {
    const customOptions: SwaggerCustomOptions = {
      swaggerOptions: {
        docExpansion: 'none',
      },
    };
    app.use(['/swagger', '/swagger-json'], basicAuth({ challenge: true, users: { [user]: password } }));
    SwaggerModule.setup('swagger', app, composeSwaggerDocument(app), customOptions);
  }
};

bootstrap();
