export enum UserRole {
  ADMIN = 'ADMIN',
  TEACHER = 'TEACHER',
}

export interface User {
  id: string;
  username: string;
  fullName: string;
  phoneNumber: string;
  email: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
