import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const authorRoutes: Routes = [
    {
        path:'author',
        loadComponent:()=> import('./components/author-list/author-list.component').then(m=>m.AuthorListComponent),
        canActivate:[AuthGuard]
    },
  ];