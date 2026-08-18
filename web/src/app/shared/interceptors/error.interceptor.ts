import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastService } from '@shared/components/toast/service';
import { AppError, ErrorApiResponse } from '@shared/types/api';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const toast = inject(ToastService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (isAuthEndpoint(req.url) && error.status === 401) {
        return throwError(() => error);
      }

      const apiError = error.error as Partial<ErrorApiResponse>;

      const appError: AppError = {
        statusCode: error.status,
        message: getErrorMessage(error),
      };

      toast.error(appError.message);

      console.error('HTTP Error', {
        http: error,
        api: apiError,
        app: appError,
      });

      return throwError(() => error);
    }),
  );
};

function getErrorMessage(error: HttpErrorResponse): string {
  if (error.error?.message) {
    return Array.isArray(error.error.message)
      ? error.error.message.join(', ')
      : error.error.message;
  }

  // Network error
  if (error.status === 0) {
    return 'Unable to connect to server. Please check your internet connection.';
  }

  // HTTP status fallback
  switch (error.status) {
    case 400:
      return 'Invalid request. Please check your input.';

    case 401:
      return 'Your session has expired. Please login again.';

    case 403:
      return 'You do not have permission to perform this action.';

    case 404:
      return 'Requested resource was not found.';

    case 500:
      return 'Something went wrong on the server. Please try again later.';

    default:
      return 'An unexpected error occurred.';
  }
}

function isAuthEndpoint(url: string): boolean {
  return (
    url.endsWith('/auth/login') || url.endsWith('/auth/refresh') || url.endsWith('/auth/logout')
  );
}
