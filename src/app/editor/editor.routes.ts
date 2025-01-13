import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const editorRoutes: Routes = [
    {
        path:'editor',
        loadComponent:()=> import('./components/editor-list/editor-list.component').then(m=>m.EditorListComponent),
        canActivate:[AuthGuard]
    },
  ];