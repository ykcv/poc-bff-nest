import { Module } from '@nestjs/common';
import { ClaimsController } from './claims.controller';
import { ClaimsService } from './claims.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { REQUEST } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule,
    HttpModule.registerAsync({
      useFactory: (configService: ConfigService, request) => ({
        baseURL: configService.get('CLAIM_SERVICE'),
        timeout: 30000,
        maxRedirects: 3,
        withCredentials: true,
        headers: {
          Authorization: request.headers.authorization
        }
      }),
      inject: [ConfigService, REQUEST],
    }),
  ],
  controllers: [ClaimsController],
  providers: [ClaimsService],
})
export class ClaimsModule { }
