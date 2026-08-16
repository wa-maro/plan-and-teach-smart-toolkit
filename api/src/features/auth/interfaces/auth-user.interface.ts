import { UserRole } from '@app-prisma/client';

export interface AuthUser {
  id: string;
  username: string;
  role: UserRole;
  isActive: boolean;
}

export interface AuthRefresh {
  sessionId: string;
  userId: string;
}
