import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { AuthorResponse } from "../models/author.model";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthorService {
    private apiUrl = `http://localhost:8000/api/author`;

    constructor(private http: HttpClient){}

    getAllAuthors(page : number = 0): Observable <AuthorResponse>{
        return this.http.get<AuthorResponse>(`${this.apiUrl}?page=${page}`);
    }
}