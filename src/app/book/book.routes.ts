// src/app/book/book.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const bookRoutes: Routes = [
  {
        path:'catalog',
        loadComponent:()=> import('./components/book-list/book-list.component').then(m=>m.BookListComponent)
    },
];
