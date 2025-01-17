import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, forkJoin, of } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { Book } from "../models/book.model";
import { BookService } from "../services/book.service";
import { AuthorService } from "../../author/services/author.service";
import { EditorService } from "../../editor/services/editor.service";
import { ErrorHandlerService } from "../../core/services/error-handler.service";
import { Author } from "../../author/models/author.model";
import { Editor } from "../../editor/models/editor.model";

@Injectable({
    providedIn: 'root'
})
export class BookFormResolver implements Resolve<{
    book: Book | null;
    authors: Author[]; 
    editors: Editor[]; 
}> {
    constructor(
        private bookService: BookService,
        private authorService: AuthorService,
        private editorService: EditorService,
        private errorHandler: ErrorHandlerService
    ) {}

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<{ book: Book | null; authors: Author[]; editors: Editor[] }> {
        const idBook = route.paramMap.get('idBook');

        const book$ = idBook 
            ? this.bookService.getBookById(idBook).pipe(
                catchError((error) => this.errorHandler.handleError<Book>(error, state.url))
              )
            : of(null);

        const authors$ = this.authorService.getAllAuthors().pipe(
            map((response) => response.items || []),
            catchError((error) => {
                this.errorHandler.handleError<Author[]>(error, state.url)
                return of([]);
            })
        );

        const editors$ = this.editorService.getAllEditors().pipe(
            map((response) => response.items || []),  
            catchError((error) => {
                this.errorHandler.handleError<Editor[]>(error, state.url)
                return of([]);
            })
        );

        return forkJoin({ book: book$, authors: authors$, editors: editors$ });
    }
}
