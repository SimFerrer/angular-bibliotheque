import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, tap } from "rxjs";
import { Book, BookResponse } from "../models/book.model";


@Injectable(
    {
        providedIn: 'root'
    }
)
export class BookService {
    private apiUrl = `http://localhost:8000/api/book`;

    constructor(private http: HttpClient) {
    }

    getAllBooks(page: number = 0): Observable<BookResponse> {
        return this.http.get<BookResponse>(`${this.apiUrl}?page=${page}`);
    }

    getBookById(id: string): Observable<Book> {
        return this.http.get<Book>(`${this.apiUrl}/${id}`);
    }

    deleteBook(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    createBook(book: Book): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, book);
    }

    updateBook(book: Book, idBook: number): Observable<any> {

        return this.http.put<any>(`${this.apiUrl}/edit`, {
            ...book,
            id: idBook
        });
    }

}