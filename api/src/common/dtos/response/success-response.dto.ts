import { ServiceResponse } from '@common/interfaces';
import { PaginationMetaDto } from './pagination-meta.dto';

export class SuccessResponseDto<T> implements ServiceResponse<T> {
  readonly success = true;

  readonly statusCode: number;

  readonly message: string;

  readonly data: T;

  readonly meta?: PaginationMetaDto;

  readonly timestamp: string;

  constructor(
    statusCode: number,
    message: string,
    response: ServiceResponse<T>,
  ) {
    this.statusCode = statusCode;
    this.message = message;

    this.data = response.data;
    this.meta = response.meta;

    this.timestamp = new Date().toISOString();
  }
}
