import { Routes } from '@angular/router';

export const preferenceRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'medium-of-instructions',
  },
  {
    path: 'medium-of-instructions',
    loadChildren: () => import('./medium-of-instruction/medium.routes').then((m) => m.mediumRoutes),
  },
];
