import { User } from '@app-prisma/client';
import { UserResponseDto } from './user-response.dto';

export class UserDetailResponseDto extends UserResponseDto {
  readonly fullName: string;
  readonly email: string | null;
  readonly createdAt: string;

  constructor(user: User) {
    super(user);

    this.fullName = user.fullName;
    this.email = user.email;
    this.createdAt = user.createdAt.toISOString();
  }
}
