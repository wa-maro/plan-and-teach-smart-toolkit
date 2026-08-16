import { User } from '@app-prisma/client';
import { AuthRefresh } from '@auth/interfaces';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ValidatedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);

export const ValidatedRefresh = createParamDecorator(
  (data: unknown, context: ExecutionContext): AuthRefresh => {
    const request = context.switchToHttp().getRequest();
    return request.user;
  },
);
