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
  UseGuards,
} from '@nestjs/common';
import { MediumOfInstructionsService } from '../medium-of-instructions.service';
import {
  CreateMediumDto,
  MediumOfInstructionQueryDto,
  UpdateMediumDto,
} from '../dtos/request';
import { SuccessMessage } from '@common/decorators';
import { ServiceResponse } from '@common/interfaces';
import { MediumOfInstructionResponseDto } from '../dtos/response';
import { JwtAuthGuard, RolesGuard } from '@auth/guards';
import { Roles } from '@auth/decorators';
import { UserRole } from '@app-prisma/client';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
@Controller('admin/medium-of-instructions')
export class AdminMediumOfInstructionsController {
  constructor(
    private readonly mediumOfInstructionsService: MediumOfInstructionsService,
  ) {}

  @Post()
  @SuccessMessage('Medium of instruction created successfully')
  create(
    @Body() createDto: CreateMediumDto,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto>> {
    return this.mediumOfInstructionsService.create(createDto);
  }

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

  @Patch(':id')
  @SuccessMessage('Medium of instruction updated successfully')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateDto: UpdateMediumDto,
  ): Promise<ServiceResponse<MediumOfInstructionResponseDto>> {
    return this.mediumOfInstructionsService.update(id, updateDto);
  }

  @Delete(':id')
  @SuccessMessage('Medium of instruction deleted successfully')
  remove(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return this.mediumOfInstructionsService.remove(id);
  }
}
