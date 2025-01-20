import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Book, BookResponse } from "../models/book.model";
import { BaseCrudService } from "../../core/services/baseCrud.service";


@Injectable(
    {
        providedIn: 'root'
    }
)
export class BookService extends BaseCrudService<Book, BookResponse> {

    constructor(http: HttpClient) {
        super(http, 'http://localhost:8000/api/book')
    }
}