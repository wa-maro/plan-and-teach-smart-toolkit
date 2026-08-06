import { SubjectQueryDto } from '../dtos/request/subject-query.dto';
import { SubjectsService } from '../subjects.service';
import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';

@Controller('admin/subjects')
export class AdminSubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  findAll(@Query() query: SubjectQueryDto) {
    return this.subjectsService.findAll(query);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.subjectsService.remove(id);
  }
}
