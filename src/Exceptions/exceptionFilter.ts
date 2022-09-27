import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpAdapterHost } from '@nestjs/core';
@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpsAdaptorHost: HttpAdapterHost) {}
  catch(exception: any, host: ArgumentsHost) {
    const { httpAdapter } = this.httpsAdaptorHost;
    const ctx = host.switchToHttp();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const responseBody = {
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      error: { response: exception.response },
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}

@Catch()
export class CustomExceptionFilterWithoutAdaptorHost
  implements ExceptionFilter
{
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({
      // statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error: { response: exception.response },
      // 'cusstom error message',
    });
  }
}
