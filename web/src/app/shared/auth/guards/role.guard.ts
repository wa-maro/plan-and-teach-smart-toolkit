import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthStore } from '../stores';
import { UserRole } from '@shared/models';

export const roleGuard: CanActivateFn = (route) => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  const roles = route.data['roles'] as UserRole[] | undefined;

  if (!roles?.length) {
    return true;
  }

  if (authStore.hasRole(...roles)) {
    return true;
  }

  return router.createUrlTree(['/']);
};
