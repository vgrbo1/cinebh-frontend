export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  last: boolean;
  number: number;
}
