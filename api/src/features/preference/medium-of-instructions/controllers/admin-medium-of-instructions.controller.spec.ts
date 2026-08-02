import { Test, TestingModule } from '@nestjs/testing';
import { AdminMediumOfInstructionsController } from './admin-medium-of-instructions.controller';

describe('AdminMediumOfInstructionsController', () => {
  let controller: AdminMediumOfInstructionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminMediumOfInstructionsController],
    }).compile();

    controller = module.get<AdminMediumOfInstructionsController>(
      AdminMediumOfInstructionsController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
