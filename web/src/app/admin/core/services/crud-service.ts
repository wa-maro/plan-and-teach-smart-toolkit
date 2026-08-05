import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { SucessApiResponse } from '@shared/types/api';
import { Observable } from 'rxjs';

export abstract class CrudService<T, CreateDto, UpdateDto> {
  protected readonly http = inject(HttpClient);

  constructor(protected readonly apiUrl: string) {}

  create(dto: CreateDto): Observable<SucessApiResponse<T>> {
    return this.http.post<SucessApiResponse<T>>(this.apiUrl, dto);
  }

  findAll(): Observable<SucessApiResponse<T[]>> {
    return this.http.get<SucessApiResponse<T[]>>(this.apiUrl);
  }

  findOne(id: string): Observable<SucessApiResponse<T>> {
    return this.http.get<SucessApiResponse<T>>(`${this.apiUrl}/${id}`);
  }

  update(id: string, dto: UpdateDto): Observable<SucessApiResponse<T>> {
    return this.http.patch<SucessApiResponse<T>>(`${this.apiUrl}/${id}`, dto);
  }

  remove(id: string): Observable<SucessApiResponse<T>> {
    return this.http.delete<SucessApiResponse<T>>(`${this.apiUrl}/${id}`);
  }
}
