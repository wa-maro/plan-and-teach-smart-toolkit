import { Routes } from '@angular/router';
import { authGuard, roleGuard } from '@shared/auth/guards';
import { guestGuard } from '@shared/auth/guards/guest.guard';
import { PanelLayout } from '@shared/components';
import { UserRole } from '@shared/models';

export const routes: Routes = [
  {
    path: 'auth',
    canActivate: [guestGuard],
    loadChildren: () => import('./shared/auth/auth.routes').then((m) => m.authRoutes),
  },
  {
    path: 'teacher',
    canActivate: [authGuard, roleGuard],
    component: PanelLayout,
    loadChildren: () => import('./teacher/teacher.routes').then((m) => m.teacherRoutes),
    data: {
      roles: [UserRole.TEACHER],
      navLinks: [
        {
          url: 'dashboard',
          title: 'Dashboard',
          icon: 'dashboard',
        },
      ],
    },
  },
  {
    path: 'admin',
    canActivate: [authGuard, roleGuard],
    component: PanelLayout,
    loadChildren: () => import('./admin/admin.routes').then((m) => m.adminRoutes),
    data: {
      roles: [UserRole.ADMIN],
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
        {
          url: ['academic', 'subjects'],
          title: 'Subjects',
          icon: 'menu_book',
        },
        {
          url: ['users'],
          title: 'users',
          icon: 'people',
        },
      ],
    },
  },
];
