import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { EnvValidation } from './common/validators';
import { Modules } from './backend';
import { LoggerMiddleware } from './common/middlewares';
@Module({
  imports: [
    ConfigModule.forRoot({
      validate: EnvValidation,
      envFilePath: '.env',
      isGlobal: true,
    }),
    ...Modules,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
