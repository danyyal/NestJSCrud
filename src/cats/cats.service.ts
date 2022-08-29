import { Injectable } from '@nestjs/common';

@Injectable()
export class CatsService {
  meow(): string {
    return 'Meow';
  }
  sleep(): string {
    return 'sleeping';
  }
}
