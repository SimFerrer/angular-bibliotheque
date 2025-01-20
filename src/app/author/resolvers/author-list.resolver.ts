import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { ErrorHandlerService } from "../../core/services/error-handler.service";
import { Author } from "../models/author.model";
import { AuthorService } from "../services/author.service";


@Injectable({
    providedIn: 'root'
})
export class AuthorListResolver implements Resolve<{ items: Author[], pagination: any } | null> {
    constructor(private authorService: AuthorService,
        private errorHandler: ErrorHandlerService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<{ items: Author[]; pagination: any } | null> {
        const page = route.queryParamMap.get('page') ? Number(route.queryParamMap.get('page')) : 1;
        return this.authorService.getAll(page).pipe(
            catchError((error) => this.errorHandler.handleError<{ items: Author[]; pagination: any }>(error, state.url))
        );
    }
}