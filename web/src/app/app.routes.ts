import { Routes } from '@angular/router';
import { PanelLayout } from './shared/ui/panel-layout/panel-layout';

export const routes: Routes = [
  {
    path: 'teacher',
    component: PanelLayout,
    loadChildren: () => import('./teacher/teacher.routes').then((m) => m.teacherRoutes),
    data: {
      navLinks: [{ url: 'dashboard', title: 'Dashboard' }],
    },
  },
];
