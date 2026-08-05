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
  {
    path: 'preference',
    loadChildren: () => import('./preference/preference.routes').then((m) => m.preferenceRoutes),
  },
  {
    path: 'academic',
    loadChildren: () => import('./academic/academic.routes').then((m) => m.academicRoutes),
  },
  {
    path: 'syllabus',
    loadChildren: () => import('./syllabus/syllabus.routes').then((m) => m.syllabusRoutes),
  },
];
