import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { NestFactory, Reflector } from '@nestjs/core';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { AuthGuard } from './common/auth/auth.guard';
import { GlobalExceptionFilter, HttpExceptionFilter } from './common/exceptions';

async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule, {
      logger: ['error', 'warn','log'],
    });

  const configService = app.get(ConfigService);
  const logger = new Logger(configService.get('APP_NAME'));

  // Prefix for Istio/Virtual service publication
  const pathPrefix: string = configService.get('PATH_PREFIX');
  app.setGlobalPrefix(pathPrefix);
  app.enableCors();

  // Global error filters
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalFilters(new HttpExceptionFilter());

  // Global guard for all routes
  const jwtService = new JwtService();
  const reflector = new Reflector();
  app.useGlobalGuards(new AuthGuard(configService, jwtService, reflector));

  // Enable NestJs hooks for shutdown operations
  app.enableShutdownHooks();

  //Swagger config
  const config = new DocumentBuilder()
    .setTitle(configService.get('APP_NAME'))
    .setDescription(configService.get('APP_DESCRIPTION'))
    .setVersion(configService.get('API_VERSION'))
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'Authorization', // This name here is important for matching up with @ApiBearerAuth() in your controller!
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      operationsSorter: 'alpha',
    },
  });
  fs.writeFileSync('./docs/swagger-spec.yaml', JSON.stringify(document));
  fs.writeFileSync('./docs/swagger-spec.json', JSON.stringify(document));

  logger.debug(`PORT::${configService.get('PORT')}`);

  await app.listen(process.env.PORT);
}
bootstrap();
