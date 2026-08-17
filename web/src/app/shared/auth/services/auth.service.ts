import { inject, Service } from '@angular/core';
import { AuthResponseDto, LoginDto } from '../models';
import { HttpClient } from '@angular/common/http';
import { ENV_CONFIG } from '../../../app.config';
import { Observable } from 'rxjs';
import { SuccessApiResponse } from '@shared/types/api';
import { User } from '@shared/models';

@Service()
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${inject(ENV_CONFIG).apiUrl}/auth`;

  login(dto: LoginDto): Observable<SuccessApiResponse<AuthResponseDto>> {
    return this.http.post<SuccessApiResponse<AuthResponseDto>>(`${this.apiUrl}/login`, dto);
  }

  refresh(): Observable<SuccessApiResponse<AuthResponseDto>> {
    return this.http.post<SuccessApiResponse<AuthResponseDto>>(`${this.apiUrl}/refresh`, null);
  }

  loadCurrentUser(): Observable<SuccessApiResponse<User>> {
    return this.http.get<SuccessApiResponse<User>>(`${this.apiUrl}/me`);
  }

  logout(): Observable<SuccessApiResponse<null>> {
    return this.http.post<SuccessApiResponse<null>>(`${this.apiUrl}/logout`, null);
  }
}
