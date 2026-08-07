import { PaginationMetaDto } from '@common/dtos/response';

export interface ServiceResponse<T> {
  readonly data: T | null;
  readonly meta?: PaginationMetaDto;
}
