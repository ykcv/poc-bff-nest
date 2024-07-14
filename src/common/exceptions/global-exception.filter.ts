


import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  Logger,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let exceptionResponse = (exception as any)?.response?.data;
    let status = exceptionResponse?.error?.statusCode;
    Logger.error(
      exceptionResponse?.error?.message,
      (exception as any).stack,
      `${request.method} ${request.url}`,
    );
    response.status(status).json(exceptionResponse);
  }
}
