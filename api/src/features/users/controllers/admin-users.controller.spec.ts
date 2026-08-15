import { Test, TestingModule } from '@nestjs/testing';
import { AdminUsersControllerController } from './admin-users.controller';

describe('AdminUsersControllerController', () => {
  let controller: AdminUsersControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminUsersControllerController],
    }).compile();

    controller = module.get<AdminUsersControllerController>(
      AdminUsersControllerController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
