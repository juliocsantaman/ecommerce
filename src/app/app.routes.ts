import { Routes } from '@angular/router';
import { NotFoundComponent } from './domains/info/pages/not-found/not-found.component';
import { LayoutComponent } from '@shared/components/layout/layout.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => import('@products/pages/list/list.component').then(m => m.ListComponent)
            },
            {
                path: 'about',
                loadComponent: () => import('@info/pages/about/about.component').then(m => m.AboutComponent)
            },
            {
                path: 'detail',
                loadComponent: () => import('@products/pages/detail/detail.component').then(m => m.DetailComponent)
            }
         
        ]
    },
    {
        path: '**',
        component: NotFoundComponent
    }

];
