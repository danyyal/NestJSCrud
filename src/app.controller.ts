import { Controller, Get } from '@nestjs/common';
import { AppService, TestService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly testService: TestService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Get()
  sayHello(): string {
    return this.testService.sayHello();
  }
}
