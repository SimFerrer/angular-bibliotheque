import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlerService {
  constructor(private router: Router, private authService: AuthService) {}

  handleError<T>(error: any, returnUrl: string = '/'): Observable<T | null> {
    if (error.status === 401) {
      alert('Votre connexion a expiré. Vous devez vous reconnecter.');
      this.authService.logout();
      this.router.navigate(['/login'], { queryParams: { returnUrl } });
    } else if (error.status === 404) {
      this.router.navigate(['/not-found']);
    } else {
      console.error('Une erreur est survenue :', error);
    }
    return of(null);
  }
}
