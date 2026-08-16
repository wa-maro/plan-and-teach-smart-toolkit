import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '@app-prisma/service';
import { UsersService } from '@users';
import { JwtTokenService } from '@security/jwt-token';
import { PasswordService } from '@security/password';
import { SessionsService } from '@security/sessions';
import { Session, User } from '@app-prisma/client';
import { AuthResponseDto } from './dtos/response';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: JwtTokenService,
    private readonly sessionsService: SessionsService,
  ) {}

  async login(user: User, userAgent: string, ipAddress: string) {
    const payload = this.tokenService.generatePayload(user);

    const access_token = await this.tokenService.generateAccessToken(payload);

    const expiresIn = this.tokenService.getRefreshExpiration();

    return await this.prisma.$transaction(async (tx) => {
      const session = await this.sessionsService.insertOne(
        {
          tokenHash: '',
          expiresAt: new Date(Date.now() + expiresIn),
          userAgent,
          ipAddress,
          lastUsedAt: new Date(Date.now()),
          user: {
            connect: { id: user.id },
          },
        },
        tx,
      );

      const refreshToken = await this.tokenService.generateRefreshToken({
        sub: user.id,
        sessionId: session.id,
      });

      await this.sessionsService.updateOne(
        session.id,
        {
          tokenHash: await this.passwordService.hash(refreshToken),
          lastUsedAt: new Date(Date.now()),
        },
        tx,
      );

      return {
        ...new AuthResponseDto(access_token, user),
        refreshToken,
        expiresIn,
      };
    });
  }

  async logout(sessionId: string) {
    const session = await this.sessionsService.findById(sessionId);
    if (!session) return;

    await this.sessionsService.updateOne(session.id, {
      revokedAt: new Date(),
    });
  }

  async refreshSession(sessionId: string) {
    const { user, refresh_token, expiresIn } = await this.prisma.$transaction(
      async (tx) => {
        const session = await this.sessionsService.findByIdWithUser(
          sessionId,
          tx,
        );
        if (!session) throw new UnauthorizedException();

        const refresh_token = await this.tokenService.generateRefreshToken({
          sub: session.userId,
          sessionId: session.id,
        });

        const expiresIn = this.tokenService.getRefreshExpiration();

        await this.sessionsService.updateOne(
          session.id,
          {
            tokenHash: await this.passwordService.hash(refresh_token),
            expiresAt: new Date(Date.now() + expiresIn),
            lastUsedAt: new Date(),
          },
          tx,
        );

        return { user: session.user, refresh_token, expiresIn };
      },
    );

    const payload = this.tokenService.generatePayload(user);

    const access_token = await this.tokenService.generateAccessToken({
      sub: payload.sub,
      user: payload.user,
    });

    return {
      ...new AuthResponseDto(access_token, user),
      refresh_token,
      expiresIn,
    };
  }

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
