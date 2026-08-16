import { type User } from '@app-prisma/client';
import { AuthService } from '@auth/auth.service';
import { ValidatedRefresh, ValidatedUser } from '@auth/decorators';
import { LocalAuthGuard, RefreshTokenGuard } from '@auth/guards';
import type { AuthRefresh } from '@auth/interfaces';
import { clearRefreshCookie, setRefreshCookie } from '@common/utils';
import {
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Ip,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import type { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(
    @ValidatedUser() validUser: User,
    @Headers('user-agent') userAgent: string,
    @Ip() ip: string,
    @Res({ passthrough: true }) response: Response,
  ) {
    const ipAddress = ip.replace('::ffff:', '');

    const { refreshToken, expiresIn, ...resObj } = await this.authService.login(
      validUser,
      userAgent,
      ipAddress,
    );

    setRefreshCookie(response, refreshToken, expiresIn);

    return { data: resObj };
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('logout')
  @UseGuards(RefreshTokenGuard)
  async logout(
    @ValidatedRefresh() refresh: AuthRefresh,
    @Res({ passthrough: true }) response: Response,
  ): Promise<void> {
    await this.authService.logout(refresh.sessionId);

    clearRefreshCookie(response);
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(RefreshTokenGuard)
  @Post('refresh')
  async refresh(
    @ValidatedRefresh() refresh: AuthRefresh,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { refresh_token, expiresIn, ...resObj } =
      await this.authService.refreshSession(refresh.sessionId);

    setRefreshCookie(response, refresh_token, expiresIn);

    return { data: resObj };
  }
}
