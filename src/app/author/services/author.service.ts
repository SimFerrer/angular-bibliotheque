import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Author, AuthorResponse } from "../models/author.model";
import { formatDate } from "@angular/common";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthorService {
    private apiUrl = `http://localhost:8000/api/author`;

    constructor(private http: HttpClient) { }

    getAllAuthors(page: number = 0): Observable<AuthorResponse> {
        return this.http.get<AuthorResponse>(`${this.apiUrl}?page=${page}`);
    }

    getAuthorById(id: string): Observable<Author> {
        return this.http.get<Author>(`${this.apiUrl}/${id}`).pipe(
            map(author => {
                author.dateOfBirth = formatDate(author.dateOfBirth, 'YYYY-MM-dd', 'en-US');
                if (author.dateOfDeath)
                    author.dateOfDeath = formatDate(author.dateOfDeath, 'YYYY-MM-dd', 'en-US');
                console.log(author.dateOfBirth)
                return author;
            })
        );
    }

    deleteAuthor(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    createAuthor(author: Author): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, author);
    }

    updateAuthor(author: Author, idAuthor: number): Observable<any> {

        return this.http.put<any>(`${this.apiUrl}/edit`, {
            ...author,
            id: idAuthor
        });
    }
}