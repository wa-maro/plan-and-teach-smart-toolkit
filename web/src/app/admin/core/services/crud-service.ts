import { HttpClient, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { SuccessApiResponse } from '@shared/types/api';
import { UrlQueryParams } from '@shared/types/navigation';
import { Observable } from 'rxjs';

export abstract class CrudService<T, CreateDto, UpdateDto> {
  private readonly http = inject(HttpClient);

  constructor(protected readonly apiUrl: string) {}

  protected apiCreate(dto: CreateDto): Observable<SuccessApiResponse<T>> {
    return this.http.post<SuccessApiResponse<T>>(this.apiUrl, dto);
  }

  protected apiFindMany(params?: UrlQueryParams): Observable<SuccessApiResponse<T[]>> {
    return this.http.get<SuccessApiResponse<T[]>>(this.apiUrl, {
      params: this.toHttpParams(params),
    });
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

  private toHttpParams(params?: UrlQueryParams): HttpParams {
    let httpParams = new HttpParams();

    if (params?.page !== undefined) {
      httpParams = httpParams.set('page', params.page);
    }

    if (params?.limit !== undefined) {
      httpParams = httpParams.set('limit', params.limit);
    }

    if (params?.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }

    if (params?.sortOrder) {
      httpParams = httpParams.set('sortOrder', params.sortOrder);
    }

    if (params?.search) {
      httpParams = httpParams.set('search', params.search);
    }

    return httpParams;
  }
}
