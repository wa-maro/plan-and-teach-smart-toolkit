import { Injectable } from '@nestjs/common';
import { PrismaService } from '@prisma';
import { PasswordService } from '@security/password';

@Injectable()
export class UsersService {
  constructor(
    private readonly passwordService: PasswordService,
    private readonly prisma: PrismaService,
  ) {}
}
