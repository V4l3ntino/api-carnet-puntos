import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorProfileController } from './profesor_profile.controller';
import { ProfesorProfileService } from './profesor_profile.service';

describe('ProfesorProfileController', () => {
  let controller: ProfesorProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfesorProfileController],
      providers: [ProfesorProfileService],
    }).compile();

    controller = module.get<ProfesorProfileController>(ProfesorProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
