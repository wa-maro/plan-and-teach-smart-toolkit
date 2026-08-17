import { UserRole } from '@shared/models';

export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case UserRole.ADMIN:
      return '/admin/dashboard';

    case UserRole.TEACHER:
      return '/teacher/dashboard';

    default:
      return '/';
  }
}
