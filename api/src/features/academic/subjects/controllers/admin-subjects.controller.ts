import { SuccessMessage } from '@common/decorators';
import { SubjectQueryDto } from '../dtos/request';
import { SubjectsService } from '../subjects.service';
import {
  Controller,
  Delete,
  Get,
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

  @SuccessMessage('Subject fetched successfully')
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.subjectsService.findOne(id);
  }

  @Delete(':id')
  @SuccessMessage('Subject deleted successfully')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.subjectsService.remove(id);
  }
}
