import { inject, Service } from '@angular/core';
import { ENV_CONFIG } from '../../../../app.config';
import { CrudService } from '../../../core/services';
import { CreateMediumDto, MediumOfInstruction, UpdateMediumDto } from '../models';
import { map, Observable } from 'rxjs';
import { PaginatedResult } from '@shared/types/api';
import { UrlQueryParams } from '@shared/types/navigation';

@Service()
export class MediumService extends CrudService<
  MediumOfInstruction,
  CreateMediumDto,
  UpdateMediumDto
> {
  constructor() {
    super(`${inject(ENV_CONFIG).adminApiUrl}/medium-of-instructions`);
  }

  getMedia(params?: UrlQueryParams): Observable<PaginatedResult<MediumOfInstruction>> {
    return this.apiFindMany(params).pipe(
      map((response) => ({
        data: response.data,
        meta: response.meta,
      })),
    );
  }

  getMedium(id: string): Observable<MediumOfInstruction> {
    return this.apiFindOne(id).pipe(map((response) => response.data));
  }

  createMedium(dto: CreateMediumDto): Observable<MediumOfInstruction> {
    return this.apiCreate(dto).pipe(map((response) => response.data));
  }

  updateMedium(id: string, dto: UpdateMediumDto): Observable<MediumOfInstruction> {
    return this.apiUpdate(id, dto).pipe(map((response) => response.data));
  }

  deleteMedium(id: string): Observable<void> {
    return this.apiRemove(id).pipe(map(() => void 0));
  }
}
