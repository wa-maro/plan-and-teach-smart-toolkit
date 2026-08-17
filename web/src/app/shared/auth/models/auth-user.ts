import { UserRole } from '@shared/models';

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}
