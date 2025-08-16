import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./modules/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'cadastro',
        loadComponent: () => import('./modules/user-registration/user-registration.component').then(m => m.UserRegistrationComponent)
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
