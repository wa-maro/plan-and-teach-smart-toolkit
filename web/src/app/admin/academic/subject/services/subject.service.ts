import { inject, Service } from '@angular/core';
import { ENV_CONFIG } from '../../../../app.config';
import { CrudService } from '../../../core/services';
import { CreateSubjectDto, Subject, UpdateSubjectDto } from '../models';
import { map, Observable } from 'rxjs';
import { PaginatedResult } from '@shared/types/api';

@Service()
export class SubjectService extends CrudService<Subject, CreateSubjectDto, UpdateSubjectDto> {
  constructor() {
    super(`${inject(ENV_CONFIG).adminApiUrl}/subjects`);
  }

  getSubjects(): Observable<PaginatedResult<Subject>> {
    return this.apiFindMany().pipe(
      map((response) => ({
        data: response.data,
        meta: response.meta,
      })),
    );
  }

  getSubject(id: string): Observable<Subject> {
    return this.apiFindOne(id).pipe(map((response) => response.data));
  }

  createSubject(dto: CreateSubjectDto): Observable<Subject> {
    return this.apiCreate(dto).pipe(map((response) => response.data));
  }

  updateSubject(id: string, dto: UpdateSubjectDto): Observable<Subject> {
    return this.apiUpdate(id, dto).pipe(map((response) => response.data));
  }

  deleteSubject(id: string): Observable<void> {
    return this.apiRemove(id).pipe(map(() => void 0));
  }
}
