import { Routes } from '@angular/router';
import { bookRoutes } from './book/book.routes';
import { authorRoutes } from './author/author.routes';
import { editorRoutes } from './editor/editor.routes';

export const routes: Routes = [
    ...bookRoutes,
    ...authorRoutes,
    ...editorRoutes,
    {
        path: 'login',
        loadComponent: () => import('./auth/components/login/login.component').then(m => m.LoginComponent),
    },
    {
        path: '',
        loadComponent: () => import('./core/components/home/home.component').then(m => m.HomeComponent),
    },
    {
      path: '**', 
      loadComponent: () => import('./core/components/not-found/not-found.component').then(m => m.NotFoundComponent)
    }
];
