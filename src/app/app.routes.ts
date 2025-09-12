import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./pages/user-registration/user-registration.component').then(m => m.UserRegistrationComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
