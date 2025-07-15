import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: "cadastro",
        loadComponent: () => import('./modules/user-registration/user-registration.component').then(m => m.UserRegistrationComponent)
    }
];
