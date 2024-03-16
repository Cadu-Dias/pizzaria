import { Routes } from "@angular/router";
import { authAdminGuard } from "../../core/auth/admin/auth-admin.guard";

export const ADMIN_ROUTES : Routes = [
    {
        path: 'login',
        loadComponent: () => import("./login-page-admin/login-page-admin.component").then(c => c.LoginPageAdminComponent)
    },
    {
        path: 'main/page',
        loadComponent: () => import("./main-page-admin/main-page-admin.component").then(c => c.MainPageAdminComponent),
        canActivateChild: [authAdminGuard],
        children: [
            {
              path: "",
              redirectTo: 'dashboard',
              pathMatch: "full"
            },
            {
              path: 'dashboard',
              loadComponent: () => import('../../components/admin/dashboard-section/dashboard-section.component').then(c => c.DashboardSectionComponent),
            },
            {
              path: 'products',
              loadComponent: () => import('../../components/admin/product-section/product-section.component').then(c => c.ProductSectionComponent),
            },
            {
              path: 'products/update/:id',
              loadComponent: () => import('../../components/admin/user-section/user-section.component').then(c => c.UserSectionComponent),
            },
            {
              path: 'orders',
              loadComponent: () => import('../../components/admin/orders-section/orders-section.component').then(c => c.OrdersSectionComponent),
            },
            {
              path: 'admins',
              loadComponent: () => import('../../components/admin/admin-section/admin-section.component').then(c => c.AdminSectionComponent),
            },
            {
              path: 'admins/register',
              loadComponent: () => import('../../components/admin/register-admin/register-admin.component').then(c => c.RegisterAdminComponent),
            },
            {
              path: 'admins/update/:id',
              loadComponent: () => import('../../components/admin/update-admin/update-admin.component').then(c => c.UpdateAdminComponent),
            },
            {
              path: 'users',
              loadComponent: () => import('../../components/admin/user-section/user-section.component').then(c => c.UserSectionComponent),
            }
        ]
    }
]