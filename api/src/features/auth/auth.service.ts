import { Injectable } from '@nestjs/common';
import { PrismaService } from '@app-prisma/service';
import { UsersService } from '@users';
import { JwtTokenService } from '@security/jwt-token';
import { PasswordService } from '@security/password';
import { SessionsService } from '@security/sessions';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: JwtTokenService,
    private readonly sessionsService: SessionsService,
  ) {}
}
