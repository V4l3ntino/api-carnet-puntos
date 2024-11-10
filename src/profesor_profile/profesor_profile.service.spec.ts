import { Test, TestingModule } from '@nestjs/testing';
import { ProfesorProfileService } from './profesor_profile.service';

describe('ProfesorProfileService', () => {
  let service: ProfesorProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfesorProfileService],
    }).compile();

    service = module.get<ProfesorProfileService>(ProfesorProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
