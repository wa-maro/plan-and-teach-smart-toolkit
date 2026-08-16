import { type User } from '@app-prisma/client';
import { AuthService } from '@auth/auth.service';
import { ValidatedUser } from '@auth/decorators';
import { LocalAuthGuard } from '@auth/guards';
import { setRefreshCookie } from '@common/utils';
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
}
