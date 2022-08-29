import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

@Injectable()
export class TestService {
  sayHello(): string {
    return 'Hello from test service';
  }
}
