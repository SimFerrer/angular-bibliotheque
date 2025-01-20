import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Editor, EditorResponse } from "../models/editor.model";
import { BaseCrudService } from "../../core/services/baseCrud.service";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class EditorService extends BaseCrudService<Editor, EditorResponse> {

    constructor(http: HttpClient) {
        super(http, 'http://localhost:8000/api/editor')
    }


}