export class ErrorResponseDto {
  readonly success = false;

  readonly statusCode: number;

  readonly message: string | string[];

  readonly error: string;

  readonly timestamp: string;

  readonly path: string;

  constructor(
    statusCode: number,
    message: string | string[],
    error: string,
    path: string,
  ) {
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;
    this.path = path;
    this.timestamp = new Date().toISOString();
  }
}
