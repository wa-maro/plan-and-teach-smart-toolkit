import { SuccessMessage } from '@common/decorators';
import {
  CreateSubjectDto,
  SubjectQueryDto,
  UpdateSubjectDto,
} from '../dtos/request';
import { SubjectsService } from '../subjects.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ServiceResponse } from '@common/interfaces';
import { SubjectResponseDto } from '../dtos/response';

@Controller('admin/subjects')
export class AdminSubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @Post()
  @SuccessMessage('Subject created successfully')
  create(
    @Body() createDto: CreateSubjectDto,
  ): Promise<ServiceResponse<SubjectResponseDto>> {
    return this.subjectsService.create(createDto);
  }

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

  @Patch(':id')
  @SuccessMessage('Subject updated successfully')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateSubjectDto,
  ): Promise<ServiceResponse<SubjectResponseDto>> {
    return this.subjectsService.update(id, updateDto);
  }

  @Delete(':id')
  @SuccessMessage('Subject deleted successfully')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.subjectsService.remove(id);
  }
}
