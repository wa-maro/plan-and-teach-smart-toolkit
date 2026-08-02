import { SubjectQueryDto } from '../dtos/request/subject-query.dto';
import { SubjectsService } from '../subjects.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('admin/subjects')
export class AdminSubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  findAll(@Query() query: SubjectQueryDto) {
    return this.subjectsService.findAll(query);
  }
}
