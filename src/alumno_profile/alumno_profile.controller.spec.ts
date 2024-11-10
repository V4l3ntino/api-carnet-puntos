import { Test, TestingModule } from '@nestjs/testing';
import { AlumnoProfileController } from './alumno_profile.controller';
import { AlumnoProfileService } from './alumno_profile.service';

describe('AlumnoProfileController', () => {
  let controller: AlumnoProfileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlumnoProfileController],
      providers: [AlumnoProfileService],
    }).compile();

    controller = module.get<AlumnoProfileController>(AlumnoProfileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
