import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app-prisma/service';
import { UsersService } from '@users';
import { JwtTokenService } from '@security/jwt-token';
import { PasswordService } from '@security/password';
import { SessionsService } from '@security/sessions';
import { Session, User } from '@app-prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: JwtTokenService,
    private readonly sessionsService: SessionsService,
  ) {}

  async validateUser(username: string, password: string): Promise<User> {
    const user = await this.usersService.findByUsername(username);
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const ok = await this.passwordService.compare(password, user.passwordHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials');

    return user;
  }

  async getActiveUser(id: string) {
    return this.usersService.findActiveUserById(id);
  }

  async validateSession(sessionId: string, token: string): Promise<Session> {
    const session = await this.sessionsService.findById(sessionId);
    if (!session) throw new UnauthorizedException('Invalid credentials1111');

    const ok = await this.passwordService.compare(token, session.tokenHash);
    if (!ok) throw new UnauthorizedException('Invalid credentials222');

    return session;
  }
}
