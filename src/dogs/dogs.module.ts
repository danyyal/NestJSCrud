import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { DogsController } from './dogs.controller';
import { LoggerMiddleware } from 'src/Middlewares/LoggerMiddleware';
import { DogsService } from './dogs.service';
import { cors } from 'src/Middlewares/CorsMiddleware';
// what does global do ?
// @Global()

@Module({
  controllers: [DogsController],
  providers: [DogsService],
})
export class DogModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(cors, LoggerMiddleware)
      .exclude('dogs/bark')
      .forRoutes(DogsController);
  }
}
