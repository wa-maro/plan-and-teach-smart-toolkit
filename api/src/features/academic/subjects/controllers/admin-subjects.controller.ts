import { SuccessMessage } from '@common/decorators';
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

  @SuccessMessage('Subjects fetched successfully')
  @Get()
  findAll(@Query() query: SubjectQueryDto) {
    return this.subjectsService.findAll(query);
  }

  @Delete(':id')
  @SuccessMessage('Subject deleted successfully')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.subjectsService.remove(id);
  }
}
