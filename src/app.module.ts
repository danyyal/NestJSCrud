import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService, TestService } from './app.service';
import { CatModule } from './cats/cats.module';
import { DogModule } from './dogs/dogs.module';
import { CustomExceptionFilter } from './Exceptions/exceptionFilter';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from './typeorm/entities';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: entities,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    CatModule,
    DogModule,
  ],
  controllers: [AppController],
  providers: [
    // { provide: APP_FILTER, useClass: CustomExceptionFilter },
    AppService,
    TestService,
  ],
})
export class AppModule
  implements
    OnApplicationBootstrap,
    OnApplicationShutdown,
    BeforeApplicationShutdown
{
  onApplicationBootstrap() {
    console.log('Application has been started');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('going to shut down application');
  }
  onApplicationShutdown(signal?: string) {
    console.log('application has been shutdown ');
  }
}
