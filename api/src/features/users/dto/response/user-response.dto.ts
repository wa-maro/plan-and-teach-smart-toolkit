import { User, UserRole } from '@app-prisma/client';
import { UserMinimalResponseDto } from './user-minimal-response.dto';

export class UserResponseDto extends UserMinimalResponseDto {
  readonly phoneNumber: string;
  readonly role: UserRole;
  readonly isActive: boolean;
  readonly updatedAt: string;

  constructor(user: User) {
    super(user);

    this.phoneNumber = user.phoneNumber;
    this.role = user.role;
    this.isActive = user.isActive;
    this.updatedAt = user.updatedAt.toISOString();
  }
}
