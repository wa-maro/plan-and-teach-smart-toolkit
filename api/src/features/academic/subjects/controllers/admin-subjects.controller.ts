import { SubjectsService } from '../subjects.service';
import { Controller } from '@nestjs/common';

@Controller('admin/subjects')
export class AdminSubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}
}
