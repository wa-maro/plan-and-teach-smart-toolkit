export interface ErrorApiResponse {
  success: false;
  statusCode: number;
  message: string | string[];
  error: string;
  timestamp: string;
  path: string;
}

export interface AppError {
  statusCode: number;
  message: string;
}
