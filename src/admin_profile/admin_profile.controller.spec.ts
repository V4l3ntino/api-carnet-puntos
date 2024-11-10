import { Test, TestingModule } from '@nestjs/testing';
import { AdminProfileController } from './admin_profile.controller';
import { AdminProfileService } from './admin_profile.service';

describe('AdminProfileController', () => {
  let controller: AdminProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdminProfileController],
      providers: [AdminProfileService],
    }).compile();

    controller = module.get<AdminProfileController>(AdminProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
