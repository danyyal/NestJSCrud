import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomExceptionFilter } from './Exceptions/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //to use the global exception filter
  //but this will not setup the gateway for hybrid applications or gateways
  // for that we have to apply the filter in the app.module file in the providers array
  // app.useGlobalFilters(new CustomExceptionFilter());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  await app.listen(5001);
}
bootstrap();
