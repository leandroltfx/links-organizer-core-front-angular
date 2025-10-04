import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () => import('./pages/user-registration/user-registration.component').then(m => m.UserRegistrationComponent)
    },
    {
        path: 'home',
        redirectTo: 'home/collections'
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent),
        children: [
            {
                path: 'collections',
                loadComponent: () => import('./pages/home/collections/collections.component').then(m => m.CollectionsComponent)
            }
        ]
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
