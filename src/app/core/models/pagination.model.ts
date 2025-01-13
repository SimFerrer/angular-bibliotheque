export interface Pagination {
    current_page: number;
    has_previous_page: boolean;
    has_next_page: boolean;
    per_page: number;
    total_items: number;
    total_pages: number;
  }