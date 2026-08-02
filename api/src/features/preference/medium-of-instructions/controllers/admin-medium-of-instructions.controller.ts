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
  findAll(@Query() query: MediumOfInstructionQueryDto) {
    return this.mediumOfInstructionsService.findAll(query);
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
