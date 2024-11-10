import { Test, TestingModule } from '@nestjs/testing';
import { CuentaPuntosService } from './cuenta_puntos.service';

describe('CuentaPuntosService', () => {
  let service: CuentaPuntosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CuentaPuntosService],
    }).compile();

    service = module.get<CuentaPuntosService>(CuentaPuntosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
