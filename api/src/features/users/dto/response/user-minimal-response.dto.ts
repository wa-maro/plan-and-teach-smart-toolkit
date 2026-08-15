import { User } from '@app-prisma/client';

export class UserMinimalResponseDto {
  readonly id: string;
  readonly username: string;

  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
  }
}
