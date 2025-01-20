import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export abstract class BaseCrudService<T, R> {
    constructor(protected http: HttpClient, private apiUrl: string) { }

    getAll(page: number = 0): Observable<R> {
        return this.http.get<R>(`${this.apiUrl}?page=${page}`);
    }

    getById(id: string): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${id}`);
    }

    create(entity: T): Observable<any> {
        return this.http.post<any>(`${this.apiUrl}/create`, entity);
    }

    update(entity: T, id: number): Observable<any> {
        return this.http.put<any>(`${this.apiUrl}/edit`, { ...entity, id });
    }

    delete(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}/${id}`);
    }
}
