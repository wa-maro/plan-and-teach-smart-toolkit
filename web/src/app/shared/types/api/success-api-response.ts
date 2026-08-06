export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface SuccessApiResponse<T> {
  success: true;
  statusCode: number;
  message: string;
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
}
