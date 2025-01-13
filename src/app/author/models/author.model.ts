import { Book } from "../../book/models/book.model";
import { PagedResponse } from "../../core/models/response.model";

export interface Author {
    id: number | null;
    name: string;
    dateOfBirth: string; 
    dateOfDeath: string | null;
    nationality: string | null;
    books: Book[];
  }

  export type AuthorResponse = PagedResponse<Author>;