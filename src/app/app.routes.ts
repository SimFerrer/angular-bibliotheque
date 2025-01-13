import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
    {
        path:'catalog',
        loadComponent:()=> import('./book/components/book-list/book-list.component').then(m=>m.BookListComponent),
        canActivate:[AuthGuard]
    },
    {
        path:'login',
        loadComponent:()=> import('./auth/components/login/login.component').then(m=>m.LoginComponent),
    },
    {
        path:'',
        loadComponent:()=> import('./core/components/home/home.component').then(m=>m.HomeComponent),
    }
];
