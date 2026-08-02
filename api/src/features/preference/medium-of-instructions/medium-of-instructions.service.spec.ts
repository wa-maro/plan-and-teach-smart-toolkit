import { Test, TestingModule } from '@nestjs/testing';
import { MediumOfInstructionsService } from './medium-of-instructions.service';

describe('MediumOfInstructionsService', () => {
  let service: MediumOfInstructionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MediumOfInstructionsService],
    }).compile();

    service = module.get<MediumOfInstructionsService>(MediumOfInstructionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
