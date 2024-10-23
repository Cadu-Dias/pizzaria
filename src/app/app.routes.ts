import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
    {
        path: 'user/page',
        loadChildren: () => import('./pages/user/user.routes').then(r => r.USER_ROUTES)
    },
    {
        path: '',
        redirectTo: 'user/page',
        pathMatch: 'full'
    },
    {
        path: 'admin/page',
        loadChildren: () => import('./pages/admin/admin.routes').then(r => r.ADMIN_ROUTES)
    }
];
