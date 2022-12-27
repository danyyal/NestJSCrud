import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
import { CatsController } from './cats.controller';
import { LoggerMiddleware } from 'src/Middlewares/LoggerMiddleware';
import { CatsService } from './cats.service';
import { createCatMiddleware } from '../Middlewares/cats/createCatMiddleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cat } from 'src/typeorm/entities';
// what does global do ?
// @Global()

@Module({
  imports: [TypeOrmModule.forFeature([Cat])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude('cats/meow')
      // .forRoutes({ path: 'cats', method: RequestMethod.GET });
      // .forRoutes({ path: 'cats', method: RequestMethod.ALL });
      .forRoutes(CatsController);
    consumer
      .apply(createCatMiddleware)
      .forRoutes({ path: 'cats/new-cat', method: RequestMethod.POST });
  }
}
