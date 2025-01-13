import { Pagination } from "./pagination.model";

export interface PagedResponse<T> {
    items: T[];
    pagination: Pagination;
  }