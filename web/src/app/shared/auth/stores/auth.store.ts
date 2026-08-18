import { computed, inject, Service, signal } from '@angular/core';
import { catchError, finalize, map, Observable, of, tap, throwError } from 'rxjs';
import { AuthService } from '../services';
import { AuthUser, LoginDto } from '../models';
import { UserRole } from '@shared/models';

type AuthStatus = 'unknown' | 'authenticated' | 'unauthenticated';

interface AuthState {
  currentUser: AuthUser | null;
  accessToken: string | null;
  status: AuthStatus;
  loading: boolean;
}

@Service()
export class AuthStore {
  private readonly authService = inject(AuthService);

  private readonly _state = signal<AuthState>({
    currentUser: null,
    accessToken: null,
    status: 'unknown',
    loading: false,
  });

  readonly currentUser = computed(() => this._state().currentUser);

  readonly isAuthenticated = computed(() => this._state().status === 'authenticated');

  readonly loading = computed(() => this._state().loading);

  initialize(): Observable<AuthUser | null> {
    this.updateCurrentState({
      status: 'unknown',
      loading: true,
    });

    return this.authService.refresh().pipe(
      map((res) => res.data),

      tap((data) => {
        this.updateCurrentState({
          accessToken: data.access_token,
          currentUser: data.user,
          status: 'authenticated',
        });
      }),

      map((data) => data.user),

      catchError((error) => {
        this.clearState();

        if (error.status === 401) {
          return of(null);
        }

        return throwError(() => error);
      }),

      finalize(() => this.updateCurrentState({ loading: false })),
    );
  }

  login(dto: LoginDto): Observable<AuthUser> {
    this.updateCurrentState({
      loading: true,
    });

    return this.authService.login(dto).pipe(
      map((res) => res.data),

      tap((data) => {
        this.updateCurrentState({
          accessToken: data.access_token,
          currentUser: data.user,
          status: 'authenticated',
        });
      }),

      map((data) => data.user),

      finalize(() => this.updateCurrentState({ loading: false })),
    );
  }

  refresh(): Observable<AuthUser> {
    return this.authService.refresh().pipe(
      map((res) => res.data),

      tap((data) => {
        this.updateCurrentState({
          accessToken: data.access_token,
          currentUser: data.user,
          status: 'authenticated',
        });
      }),

      map((data) => data.user),
    );
  }

  logout(): Observable<null> {
    return this.authService.logout().pipe(
      map((res) => res.data),

      finalize(() => this.clearState()),
    );
  }

  hasRole(...roles: UserRole[]): boolean {
    const currentUser = this.currentUser();

    if (!currentUser) return false;

    return roles.includes(currentUser.role);
  }

  private clearState(): void {
    this.updateCurrentState({
      currentUser: null,
      accessToken: null,
      status: 'unauthenticated',
    });
  }

  private updateCurrentState(partial: Partial<AuthState>): void {
    this._state.update((state) => ({
      ...state,
      ...partial,
    }));
  }
}
