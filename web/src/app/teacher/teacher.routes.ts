import { Routes } from '@angular/router';
import { TeacherDashboard } from './teacher-dashboard/teacher-dashboard';

export const teacherRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
  {
    path: 'dashboard',
    component: TeacherDashboard,
    title: 'Dashboard | TeachDocs',
  },
];
