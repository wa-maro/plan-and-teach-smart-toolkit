import { AuthUser } from './auth-user';

export interface AuthResponseDto {
  access_token: string;
  user: AuthUser;
}
