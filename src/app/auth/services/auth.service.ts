import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/login_check';
  private authSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.isTokenExist());

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, { username, password }).pipe(
      tap((response)=>{
        localStorage.setItem('access_token', response.token)
        this.authSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.authSubject.next(false);
  }

  isAuthenticated(): Observable<boolean> {
    // Retourner un observable qui émet true si un token est présent
    return this.authSubject.asObservable();
  }
  private isTokenExist(): boolean {
    return !!localStorage.getItem('access_token');
  }

  
}

interface LoginResponse {
  token: string;
}