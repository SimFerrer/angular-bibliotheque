import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { BookResponse } from "../models/book.model";


@Injectable(
    {
        providedIn: 'root'
    }
)
export class BookService{
    private apiUrl = `http://localhost:8000/api/book`;

    constructor(private http: HttpClient){

    }

    getAllBooks(page: number = 1): Observable<BookResponse> {
        return this.http.get<BookResponse>(`${this.apiUrl}?page=${page}`);
      }

}