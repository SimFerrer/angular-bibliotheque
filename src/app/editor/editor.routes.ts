import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const editorRoutes: Routes = [
    {
        path: 'editor/new',
        loadComponent: () => import('./components/editor-form/editor-form.component').then(m => m.EditorFormComponent),
        canActivate:[AuthGuard]
    },
    {
        path: 'editor/edit/:idEditor',
        loadComponent: () => import('./components/editor-form/editor-form.component').then(m => m.EditorFormComponent),
        canActivate:[AuthGuard]
    },
    {
        path:'editor',
        loadComponent:()=> import('./components/editor-list/editor-list.component').then(m=>m.EditorListComponent),
        canActivate:[AuthGuard]
    },
  ];