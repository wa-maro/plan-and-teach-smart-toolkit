import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { SuccessApiResponse } from '@shared/types/api';
import { Observable } from 'rxjs';

export abstract class CrudService<T, CreateDto, UpdateDto> {
  private readonly http = inject(HttpClient);

  constructor(protected readonly apiUrl: string) {}

  protected apiCreate(dto: CreateDto): Observable<SuccessApiResponse<T>> {
    return this.http.post<SuccessApiResponse<T>>(this.apiUrl, dto);
  }

  protected apiFindMany(params?: HttpParams): Observable<SuccessApiResponse<T[]>> {
    return this.http.get<SuccessApiResponse<T[]>>(this.apiUrl, { params });
  }

  protected apiFindOne(id: string): Observable<SuccessApiResponse<T>> {
    return this.http.get<SuccessApiResponse<T>>(`${this.apiUrl}/${id}`);
  }

  protected apiUpdate(id: string, dto: UpdateDto): Observable<SuccessApiResponse<T>> {
    return this.http.patch<SuccessApiResponse<T>>(`${this.apiUrl}/${id}`, dto);
  }

  protected apiRemove(id: string): Observable<SuccessApiResponse<null>> {
    return this.http.delete<SuccessApiResponse<null>>(`${this.apiUrl}/${id}`);
  }
}
