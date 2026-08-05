import { inject, Service } from '@angular/core';
import { ENV_CONFIG } from '../../../../app.config';
import { CrudService } from '../../../core/services';
import { CreateSubjectDto, Subject, UpdateSubjectDto } from '../models';

@Service()
export class SubjectService extends CrudService<Subject, CreateSubjectDto, UpdateSubjectDto> {
  constructor() {
    super(`${inject(ENV_CONFIG).adminApiUrl}/subjects`);
  }
}
