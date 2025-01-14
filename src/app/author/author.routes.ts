import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const authorRoutes: Routes = [
    {
        path: 'author/new',
        loadComponent: () => import('./components/author-form/author-form.component').then(m => m.AuthorFormComponent),
        canActivate:[AuthGuard]
    },
    {
        path: 'author/:idAuthor',
        loadComponent: () => import('./components/author-detail/author-detail.component').then(m => m.AuthorDetailComponent),
        canActivate:[AuthGuard]
    },
    {
        path: 'author/edit/:idAuthor',
        loadComponent: () => import('./components/author-form/author-form.component').then(m => m.AuthorFormComponent),
        canActivate:[AuthGuard]
    },
    {
        path:'author',
        loadComponent:()=> import('./components/author-list/author-list.component').then(m=>m.AuthorListComponent),
        canActivate:[AuthGuard]
    },
  ];