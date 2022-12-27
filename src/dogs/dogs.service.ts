import { Injectable, OnApplicationShutdown } from '@nestjs/common';

@Injectable()
export class DogsService implements OnApplicationShutdown {
  onApplicationShutdown(signal?: string) {
    console.log(signal, 'from dogs service');
  }
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
