import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { SuccessApiResponse } from '@shared/types/api';
import { Observable } from 'rxjs';

export abstract class CrudService<T, CreateDto, UpdateDto> {
  protected readonly http = inject(HttpClient);

  constructor(protected readonly apiUrl: string) {}

  create(dto: CreateDto): Observable<SuccessApiResponse<T>> {
    return this.http.post<SuccessApiResponse<T>>(this.apiUrl, dto);
  }

  findAll(): Observable<SuccessApiResponse<T[]>> {
    return this.http.get<SuccessApiResponse<T[]>>(this.apiUrl);
  }

  findOne(id: string): Observable<SuccessApiResponse<T>> {
    return this.http.get<SuccessApiResponse<T>>(`${this.apiUrl}/${id}`);
  }

  update(id: string, dto: UpdateDto): Observable<SuccessApiResponse<T>> {
    return this.http.patch<SuccessApiResponse<T>>(`${this.apiUrl}/${id}`, dto);
  }

  remove(id: string): Observable<SuccessApiResponse<T>> {
    return this.http.delete<SuccessApiResponse<T>>(`${this.apiUrl}/${id}`);
  }
}
