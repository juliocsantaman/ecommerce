import { Routes } from '@angular/router';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';
import { authGuard } from '@shared/guards/auth-guard/auth.guard';
import { loginGuard } from '@shared/guards/login-guard/login.guard';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                canActivate: [loginGuard],
                loadComponent: () => import('./domains/auth/pages/initial/initial.component').then(m => m.InitialComponent)
            },
            {
                path: 'login',
                canActivate: [loginGuard],
                loadComponent: () => import('./domains/auth/pages/login/login.component').then(m => m.LoginComponent)
            },
            {
                path: 'register',
                canActivate: [loginGuard],
                loadComponent: () => import('./domains/auth/pages/register/register.component').then(m => m.RegisterComponent)
            },
            {
                path: 'product-list',
                canActivate: [authGuard],
                loadComponent: () => import('@products/pages/list/list.component').then(m => m.ListComponent)
            },
            {
                path: 'about',
                canActivate: [authGuard],
                loadComponent: () => import('@info/pages/about/about.component').then(m => m.AboutComponent)
            },
            {
                path: 'detail',
                canActivate: [authGuard],
                loadComponent: () => import('@products/pages/detail/detail.component').then(m => m.DetailComponent)
            }
         
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }

];
