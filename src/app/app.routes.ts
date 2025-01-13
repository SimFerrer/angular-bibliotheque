import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path:'catalog',
        loadComponent:()=> import('./book/components/book-list/book-list.component').then(m=>m.BookListComponent),
    },
    {
        path:'',
        loadComponent:()=> import('./core/components/home/home.component').then(m=>m.HomeComponent),
    }
];
