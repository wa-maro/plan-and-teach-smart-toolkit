import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ErrorResponseDto } from '@common/dtos/response';
import { Prisma } from '@prisma';
import { mapPrismaException } from '@common/utils';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<Response>();

    const request = ctx.getRequest<Request>();

    let statusCode = 500;

    let message: string | string[] = 'Internal server error';

    let error = 'Internal Server Error';

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      exception = mapPrismaException(exception);
    }

    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();

      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else {
        const errorResponse = exceptionResponse as {
          message?: string | string[];
          error?: string;
        };

        message = errorResponse.message ?? message;

        error = errorResponse.error ?? error;
      }
    }

    response
      .status(statusCode)
      .json(new ErrorResponseDto(statusCode, message, error, request.url));
  }
}
