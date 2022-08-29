import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(
      'Inside the logger middleware after calling next from the cors middleware',
    );
    next();
    console.log('At the end of logger middleware');
  }
}
