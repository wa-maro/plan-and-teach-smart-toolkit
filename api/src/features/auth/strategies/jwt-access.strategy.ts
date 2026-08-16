import { AuthService } from '@auth/auth.service';
import { AuthUser } from '@auth/interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { JWTAccessPayload } from '@security/jwt-token';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(
  Strategy,
  'jwt-access',
) {
  constructor(
    private readonly config: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.getOrThrow<string>('JWT_ACCESS_SECRET'),
    });
  }

  async validate(payload: JWTAccessPayload): Promise<AuthUser> {
    const existing = await this.authService.getActiveUser(payload.sub);
    if (!existing) throw new UnauthorizedException();

    return {
      id: existing.id,
      username: existing.username,
      role: existing.role,
      isActive: existing.isActive,
    };
  }
}
