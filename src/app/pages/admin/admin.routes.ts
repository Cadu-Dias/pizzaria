import { Routes } from "@angular/router";

export const ADMIN_ROUTES : Routes = [
    {
        path: 'login',
        loadComponent: () => import("./login-page-admin/login-page-admin.component").then(c => c.LoginPageAdminComponent)
    },
    {
        path: 'main/page',
        loadComponent: () => import("./main-page-admin/main-page-admin.component").then(c => c.MainPageAdminComponent)
    }
]