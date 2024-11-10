import { Test, TestingModule } from '@nestjs/testing';
import { TablasService } from './tablas.service';

describe('TablasService', () => {
  let service: TablasService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablasService],
    }).compile();

    service = module.get<TablasService>(TablasService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
