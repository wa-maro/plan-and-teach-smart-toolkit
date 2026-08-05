import { Routes } from '@angular/router';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';

export const adminRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: AdminDashboard,
    title: 'Dashboard | TeachDocs',
  },
];
