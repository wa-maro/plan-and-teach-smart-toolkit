import { Routes } from '@angular/router';

export const academicRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'subjects',
  },
  {
    path: 'subjects',
    loadChildren: () => import('./subject/subject.routes').then((m) => m.subjectRoutes),
  },
];
