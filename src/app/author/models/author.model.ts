import { Book } from "../../book/models/book.model";

export interface Author {
    id: number | null;
    name: string;
    dateOfBirth: string; 
    dateOfDeath: string | null;
    nationality: string | null;
    books: Book[];
  }