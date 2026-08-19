import { Routes } from '@angular/router';
import { Login } from './pages';

export const authRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: Login,
    title: 'Login | TeachDocs',
  },
];
