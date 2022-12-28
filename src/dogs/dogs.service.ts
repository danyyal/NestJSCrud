import { Injectable } from '@nestjs/common';

@Injectable()
export class DogsService {
  bark(): string {
    return 'barking';
  }
  sleep(): string {
    return 'sleeping';
  }
  run(): string {
    return 'Running';
  }
}
