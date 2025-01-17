import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { Observable, catchError, of } from "rxjs";
import { ErrorHandlerService } from "../../core/services/error-handler.service";
import { Editor } from "../models/editor.model";
import { EditorService } from "../services/editor.service";



@Injectable({
    providedIn: 'root'
})
export class EditorListResolver implements Resolve<{ items: Editor[], pagination: any } | null>{
    constructor(private editorService: EditorService,
        private errorHandler: ErrorHandlerService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<{ items: Editor[]; pagination: any } | null> {
        const page = route.queryParamMap.get('page') ? Number(route.queryParamMap.get('page')) : 1;
        return this.editorService.getAllEditors(page).pipe(
            catchError((error) => this.errorHandler.handleError<{ items: Editor[]; pagination: any }>(error, state.url))
        );
    }
}