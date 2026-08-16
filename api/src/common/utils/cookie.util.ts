import { Response, CookieOptions } from 'express';

const cookieOptions: CookieOptions = {
  httpOnly: true,
  sameSite: 'strict',
  path: '/auth/refresh',
};

export function setRefreshCookie(
  response: Response,
  refreshToken: string,
  maxAge: number,
  secure = process.env.NODE_ENV === 'production',
) {
  response.cookie('refresh_token', refreshToken, {
    ...cookieOptions,
    secure,
    maxAge,
  });
}

export function clearRefreshCookie(
  response: Response,
  secure = process.env.NODE_ENV === 'production',
) {
  response.clearCookie('refreshToken', { ...cookieOptions, secure });
}
