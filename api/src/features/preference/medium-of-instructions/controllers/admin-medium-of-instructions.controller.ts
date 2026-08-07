import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { MediumOfInstructionsService } from '../medium-of-instructions.service';
import { MediumOfInstructionQueryDto } from '../dtos/request';
import { SuccessMessage } from '@common/decorators';
import { ServiceResponse } from '@common/interfaces';
import { MediumOfInstructionResponseDto } from '../dtos/response';

@Controller('admin/medium-of-instructions')
export class AdminMediumOfInstructionsController {
  constructor(
    private readonly mediumOfInstructionsService: MediumOfInstructionsService,
  ) {}

  @Get()
  @SuccessMessage('Media of instruction fetched successfully')
  findAll(
    @Query() query: MediumOfInstructionQueryDto,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto[]>> {
    return this.mediumOfInstructionsService.findAll(query);
  }

  @Get(':id')
  @SuccessMessage('Medium of instruction fetched successfully')
  findOne(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto>> {
    return this.mediumOfInstructionsService.findOne(id);
  }

  @Delete(':id')
  @SuccessMessage('Medium of instruction deleted successfully')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.mediumOfInstructionsService.remove(id);
  }
}
