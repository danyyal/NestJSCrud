import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }

  // to check yet
  // throw new HttpException(
  //   {
  //     status: HttpStatus.FORBIDDEN,
  //     error: 'This is a custom message.',
  //   },
  //   HttpStatus.FORBIDDEN,
  // );
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super('Unauthorized', HttpStatus.UNAUTHORIZED);
  }
}

export class TooManyRequestsException extends HttpException {
  constructor() {
    super('Too many requests', HttpStatus.TOO_MANY_REQUESTS);
  }
}

export class BadRequestException extends HttpException {
  constructor() {
    super('Bad request', HttpStatus.BAD_REQUEST);
  }
}
