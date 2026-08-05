import { Routes } from '@angular/router';
import { PanelLayout } from '@shared/components';

export const routes: Routes = [
  {
    path: 'teacher',
    component: PanelLayout,
    loadChildren: () => import('./teacher/teacher.routes').then((m) => m.teacherRoutes),
    data: {
      navLinks: [{ url: 'dashboard', title: 'Dashboard' }],
    },
  },
  {
    path: 'admin',
    component: PanelLayout,
    loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
    data: {
      navLinks: [
        {
          url: 'dashboard',
          title: 'Dashboard',
          icon: 'dashboard',
        },
        {
          url: ['preference', 'medium-of-instructions'],
          title: 'Medium of Instructions',
          icon: 'translate',
        },
      ],
    },
  },
];
