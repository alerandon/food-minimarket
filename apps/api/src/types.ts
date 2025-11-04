export interface PaginatedResult<T> {
  items: T[];
  page: number;
  limit: number;
  totalItems: number;
  hasPrev: boolean;
  hasNext: boolean;
}
