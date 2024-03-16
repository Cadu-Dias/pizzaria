import { Routes } from "@angular/router";

export const USER_ROUTES : Routes = [
    {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
    },
    {
        path: 'main',
        loadComponent: () => import('./main-page-user/main-page-user.component').then(c => c.MainPageUserComponent)
    }
]