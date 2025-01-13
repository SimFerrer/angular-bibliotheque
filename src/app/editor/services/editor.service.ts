import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EditorResponse } from "../models/editor.model";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class EditorService {
    private apiUrl = `http://localhost:8000/api/editor`;

    constructor(private http: HttpClient){}

    getAllEditors(page : number = 1): Observable <EditorResponse>{
        return this.http.get<EditorResponse>(`${this.apiUrl}?page=${page}`);
    }
}