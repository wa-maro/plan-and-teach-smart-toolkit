export class PaginationMetaDto {
  page: number;
  limit: number;
  total: number;
  readonly totalPages: number;

  constructor(page: number, limit: number, total: number) {
    this.page = page;
    this.limit = limit;
    this.total = total;
    this.totalPages = Math.ceil(total / limit);
  }
}
