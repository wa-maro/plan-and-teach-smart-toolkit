import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MediumOfInstructionsService } from '../medium-of-instructions.service';
import { MediumOfInstructionQueryDto } from '../dtos/request/medium-of-instruction-query.dto';
import { SuccessMessage } from '@common/decorators';

@Controller('admin/medium-of-instructions')
export class AdminMediumOfInstructionsController {
  constructor(
    private readonly mediumOfInstructionsService: MediumOfInstructionsService,
  ) {}

  @Post()
  create() {
    return this.mediumOfInstructionsService.create();
  }

  @Get()
  @SuccessMessage('Media of instruction fetched successfully')
  findAll(@Query() query: MediumOfInstructionQueryDto) {
    return this.mediumOfInstructionsService.findAll(query);
  }

  @SuccessMessage('Medium of instruction fetched successfully')
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediumOfInstructionsService.findOne(id);
  }

  @Patch()
  update(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediumOfInstructionsService.update(id);
  }

  @Delete(':id')
  @SuccessMessage('Media of instruction deleted successfully')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediumOfInstructionsService.remove(id);
  }
}
