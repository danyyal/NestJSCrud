import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class cors implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Inside the cors middleware before calling logger middle ware');
    next();
    console.log('After calling next function');
  }
}
