import { Test, TestingModule } from '@nestjs/testing';
import { RetrasosService } from './retrasos.service';

describe('RetrasosService', () => {
  let service: RetrasosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RetrasosService],
    }).compile();

    service = module.get<RetrasosService>(RetrasosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
