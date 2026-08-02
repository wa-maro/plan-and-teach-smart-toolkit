import {
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { MediumOfInstructionsService } from '../medium-of-instructions.service';

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
  findAll() {
    return this.mediumOfInstructionsService.findAll();
  }

  @Get()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediumOfInstructionsService.findOne(id);
  }

  @Patch()
  update(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediumOfInstructionsService.update(id);
  }

  @Delete()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.mediumOfInstructionsService.remove(id);
  }
}
