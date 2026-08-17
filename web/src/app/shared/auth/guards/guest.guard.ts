import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores';
import { getDashboardRoute } from '../utils';

export const guestGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const user = authStore.currentUser();

  if (!user) {
    return true;
  }

  return router.createUrlTree([getDashboardRoute(user.role)]);
};
