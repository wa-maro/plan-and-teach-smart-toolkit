import { SUCCESS_MESSAGE_KEY } from '@common/decorators';
import { SuccessResponseDto } from '@common/dtos/response';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor(private readonly reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();

    const statusCode = ctx.getResponse().statusCode;

    const message = this.reflector.get<string>(
      SUCCESS_MESSAGE_KEY,
      context.getHandler(),
    );

    return next.handle().pipe(
      map((response) => {
        return new SuccessResponseDto(
          statusCode,
          message ?? 'Success',
          response,
        );
      }),
    );
  }
}
