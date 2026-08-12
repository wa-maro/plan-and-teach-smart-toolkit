export interface JWTAccessPayload {
  sub: string;
  user: {
    username: string;
    role: string;
  };
}

export interface JwtRefreshPayload {
  sub: string;
  sessionId: string;
}
