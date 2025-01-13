import { Author } from "../../author/models/author.model";
import { Pagination } from "../../core/models/pagination.model";
import { Editor } from "../../editor/models/editor.model";
import { User } from "../../user/models/user.model";
import { BookStatus } from "../enums/book-status.enum";

export interface Book {
    id: number | null;
    title: string;
    isbn: string;
    cover: string; 
    editedAt: string; 
    plot: string; 
    pageNumber: number;
    status: BookStatus; 
    editor: Editor | null; 
    authors: Author[];
    createdBy: User | null;
  }

  
export interface BookResponse {
    items: Book[];
    pagination: Pagination;
  }