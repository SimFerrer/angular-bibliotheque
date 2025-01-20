// src/app/book/book.routes.ts
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';
import { BookListResolver } from './resolvers/book-list.resolver';
import { BookFormResolver } from './resolvers/book-form.resolver';
import { BookDetailResolver } from './resolvers/book-detail.resolver';

export const bookRoutes: Routes = [

    {
        path: 'catalog/new',
        loadComponent: () => import('./components/book-form/book-form.component').then(m => m.BookFormComponent),
        canActivate: [AuthGuard],
        resolve: { bookData: BookFormResolver }
    },
    {
        path: 'catalog/:idBook',
        loadComponent: () => import('./components/book-detail/book-detail.component').then(m => m.BookDetailComponent),
        resolve: { bookData: BookDetailResolver }
    },
    {
        path: 'catalog/edit/:idBook',
        loadComponent: () => import('./components/book-form/book-form.component').then(m => m.BookFormComponent),
        canActivate: [AuthGuard],
        resolve: { bookData: BookFormResolver }
    },
    {
        path: 'catalog',
        loadComponent: () => import('./components/book-list/book-list.component').then(m => m.BookListComponent),
        resolve: { booksData: BookListResolver },
        runGuardsAndResolvers: 'paramsOrQueryParamsChange'
    },
];
