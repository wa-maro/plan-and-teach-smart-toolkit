import {
  ConflictException,
  HttpException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma } from '@prisma';

export function mapPrismaException(
  exception: Prisma.PrismaClientKnownRequestError,
): HttpException {
  switch (exception.code) {
    case 'P2002':
      return new ConflictException(
        'A resource with the provided value already exists',
      );

    case 'P2039':
      return new ConflictException(
        'Cannot complete this operation because the resource is referenced by another resource',
      );

    case 'P2025':
      return new NotFoundException('Resource not found');

    default:
      return new HttpException('Database operation failed', 500);
  }
}
