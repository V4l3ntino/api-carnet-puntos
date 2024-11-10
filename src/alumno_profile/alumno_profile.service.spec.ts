import { Test, TestingModule } from '@nestjs/testing';
import { AlumnoProfileService } from './alumno_profile.service';

describe('AlumnoProfileService', () => {
  let service: AlumnoProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlumnoProfileService],
    }).compile();

    service = module.get<AlumnoProfileService>(AlumnoProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
