import { Author } from "../../author/models/author.model";
import { PagedResponse } from "../../core/models/response.model";
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
    editor: Editor ; 
    authors: Author[] ;
    createdBy: User | null;
  }

  
  export type BookResponse = PagedResponse<Book>;