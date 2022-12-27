import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { LoggerMiddleware } from 'src/Middlewares/LoggerMiddleware';
import { DogsService } from './dogs.service';
import { cors } from 'src/Middlewares/CorsMiddleware';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInterceptor } from 'src/Interceptors/LoggingInterceptor';
// what does global do ?
// @Global()

@Module({
  controllers: [DogsController],
  providers: [
    { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor },
    DogsService,
  ],
})
export class DogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors, LoggerMiddleware)
      .exclude('dogs/bark')
      .forRoutes(DogsController);
  }
}
