export interface TableSortChange {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
}

export interface PaginationChange {
  page: number;
  limit: number;
}

export interface UrlQueryParams extends Partial<TableSortChange & PaginationChange> {
  search?: string;
}
