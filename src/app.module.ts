import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService, TestService } from './app.service';
import { CatModule } from './cats/cats.module';
import { DogModule } from './dogs/dogs.module';
import { CustomExceptionFilter } from './Exceptions/exceptionFilter';

@Module({
  imports: [CatModule, DogModule],
  controllers: [AppController],
  providers: [
    // { provide: APP_FILTER, useClass: CustomExceptionFilter },
    AppService,
    TestService,
  ],
})
export class AppModule {}
