export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SucessApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}
