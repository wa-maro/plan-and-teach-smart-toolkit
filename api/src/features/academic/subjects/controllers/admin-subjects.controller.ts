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
import { ServiceResponse } from '@common/interfaces';
import { SubjectResponseDto } from '../dtos/response';

@Controller('admin/subjects')
export class AdminSubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Get()
  @SuccessMessage('Subjects fetched successfully')
  findAll(
    @Query() query: SubjectQueryDto,
  ): Promise<ServiceResponse<SubjectResponseDto[]>> {
    return this.subjectsService.findAll(query);
  }

  @Get(':id')
  @SuccessMessage('Subject fetched successfully')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ServiceResponse<SubjectResponseDto>> {
    return this.subjectsService.findOne(id);
  }

  @Delete(':id')
  @SuccessMessage('Subject deleted successfully')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.subjectsService.remove(id);
  }
}
