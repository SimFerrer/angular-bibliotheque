import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { Editor, EditorResponse } from "../models/editor.model";

@Injectable(
    {
        providedIn: 'root'
    }
)
export class EditorService {
    private apiUrl = `http://localhost:8000/api/editor`;

    constructor(private http: HttpClient) { }

    getAllEditors(page: number = 0): Observable<EditorResponse> {
        return this.http.get<EditorResponse>(`${this.apiUrl}?page=${page}`);
    }

    getEditorById(id: string): Observable<Editor> {
        return this.http.get<Editor>(`${this.apiUrl}/${id}`);
    }

    deleteEditor(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }

    createEditor(editor: Editor): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, editor);
    }

    updateEditor(editor: Editor, idEditor: number): Observable<any> {

        return this.http.put<any>(`${this.apiUrl}/edit`, {
            ...editor,
            id: idEditor
        });
    }
}