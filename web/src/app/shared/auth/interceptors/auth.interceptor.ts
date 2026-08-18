import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { AuthStore } from '../stores';
import { inject } from '@angular/core';
import { catchError, finalize, shareReplay, switchMap, throwError } from 'rxjs';

let refresh$: ReturnType<AuthStore['refresh']> | null = null;

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authStore = inject(AuthStore);

  const accessToken = authStore.accessToken();

  const authReq = accessToken
    ? req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && isAuthEndpoint(req.url)) {
        return throwError(() => error);
      }

      return refreshToken(authStore).pipe(
        catchError((refreshError) => {
          authStore.expireSession();

          return throwError(() => refreshError);
        }),

        switchMap((user) => {
          const newToken = authStore.accessToken();

          if (!newToken) return throwError(() => error);

          const retryReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${newToken}`,
            },
          });

          return next(retryReq);
        }),
      );
    }),
  );
};

function refreshToken(authStore: AuthStore) {
  if (!refresh$) {
    refresh$ = authStore.refresh().pipe(
      shareReplay(1),
      finalize(() => {
        refresh$ = null;
      }),
    );
  }

  return refresh$;
}

function isAuthEndpoint(url: string): boolean {
  return (
    url.endsWith('/auth/login') || url.endsWith('/auth/refresh') || url.endsWith('/auth/logout')
  );
}
