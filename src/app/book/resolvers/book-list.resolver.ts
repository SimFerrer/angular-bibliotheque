import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Book } from "../models/book.model";
import { BookService } from "../services/book.service";
import { Observable, catchError, of } from "rxjs";
import { ErrorHandlerService } from "../../core/services/error-handler.service";


@Injectable({
    providedIn: 'root'
})
export class BookListResolver implements Resolve<{ items: Book[], pagination: any } | null>{
    constructor(private bookService: BookService,
        private errorHandler: ErrorHandlerService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<{ items: Book[]; pagination: any } | null> {
        const page = route.queryParamMap.get('page') ? Number(route.queryParamMap.get('page')) : 1;
        return this.bookService.getAllBooks(page).pipe(
            catchError((error) => this.errorHandler.handleError<{ items: Book[]; pagination: any }>(error, state.url))
        );
    }
}