import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Book } from "../models/book.model";
import { BookService } from "../services/book.service";
import { Observable, catchError, map, of } from "rxjs";
import { ErrorHandlerService } from "../../core/services/error-handler.service";


@Injectable({
    providedIn: 'root'
})
export class BookDetailResolver implements Resolve<{ book: Book } | null> {
    constructor(private bookService: BookService,
        private errorHandler: ErrorHandlerService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<{ book: Book } | null> {
        const idBook = route.paramMap.get('idBook');
        if (idBook) {
            return this.bookService.getById(idBook).pipe(
                map(book => ({ book })),
                catchError((error) => this.errorHandler.handleError<{ book: Book }>(error, state.url))
            );
        }
        return of(null);
    }

}