import { Test, TestingModule } from '@nestjs/testing';
import { AdminSubjectsController } from './admin-subjects.controller';

describe('AdminSubjectsController', () => {
  let controller: AdminSubjectsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminSubjectsController],
    }).compile();

    controller = module.get<AdminSubjectsController>(AdminSubjectsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
