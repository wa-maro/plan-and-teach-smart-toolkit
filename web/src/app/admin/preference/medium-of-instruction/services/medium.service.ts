import { inject, Service } from '@angular/core';
import { ENV_CONFIG } from '../../../../app.config';
import { CrudService } from '../../../core/services';
import { CreateMediumDto, MediumOfInstruction, UpdateMediumDto } from '../models';

@Service()
export class MediumService extends CrudService<
  MediumOfInstruction,
  CreateMediumDto,
  UpdateMediumDto
> {
  constructor() {
    super(`${inject(ENV_CONFIG).adminApiUrl}/medium-of-instructions`);
  }
}
