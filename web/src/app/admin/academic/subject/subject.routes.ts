import { Routes } from '@angular/router';
import { SubjectList } from './pages';

export const subjectRoutes: Routes = [
  {
    path: '',
    component: SubjectList,
    title: 'Subjects | TeachDocs',
  },
];
