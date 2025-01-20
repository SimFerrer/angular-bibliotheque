import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Author, AuthorResponse } from "../models/author.model";
import { formatDate } from "@angular/common";
import { BaseCrudService } from "../../core/services/baseCrud.service";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class AuthorService extends BaseCrudService<Author, AuthorResponse> {

    constructor(http: HttpClient) {
        super(http, 'http://localhost:8000/api/author')
    }

    override getById(id: string): Observable<Author> {
        return super.getById(id).pipe(
            map(author => {
                author.dateOfBirth = formatDate(author.dateOfBirth, 'YYYY-MM-dd', 'en-US');
                if (author.dateOfDeath)
                    author.dateOfDeath = formatDate(author.dateOfDeath, 'YYYY-MM-dd', 'en-US');
                console.log(author.dateOfBirth)
                return author;
            })
        );
    }

}