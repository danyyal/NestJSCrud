import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService, TestService } from './app.service';
import { CatModule } from './cats/cats.module';
import { DogModule } from './dogs/dogs.module';

@Module({
  imports: [CatModule, DogModule],
  controllers: [AppController],
  providers: [AppService, TestService],
})
export class AppModule {}
