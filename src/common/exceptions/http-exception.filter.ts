/* Extra */
import { Request, Response } from 'express';

/* Project */
import { filterRequestParams } from '../utils';

import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { CustomResponse } from './custom-response';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  /**
   * Catch any exception type HTTP triggered by nest
   * @param {HttpException} exception
   * @param {ArgumentsHost} host
   */
  catch(exception: HttpException, host: ArgumentsHost) {
    this.logger.warn('=== HttpExceptionFilter ===');

    if (exception instanceof Error) this.logger.error(exception.stack);
    this.logger.error(exception);

    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exception).message || exception.message;
    const timestamp = new Date().toISOString();
    const params = filterRequestParams(request);
    this.logger.error({
      statusCode: status,
      message,
      errors: exception['cause'] || [],
      path: request.path,
      params,
      timestamp,
    });

    const customResponse: CustomResponse = {
      timestamp,
      error: {
        statusCode: status,
        message,
      },
    };
    let statusRes = status;
    if (!(status >= 100 && status < 600)) {
      statusRes = 400;
    }
    response.status(statusRes).json(customResponse);
  }
}
