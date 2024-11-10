import { Test, TestingModule } from '@nestjs/testing';
import { CuentaPuntosController } from './cuenta_puntos.controller';
import { CuentaPuntosService } from './cuenta_puntos.service';

describe('CuentaPuntosController', () => {
  let controller: CuentaPuntosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CuentaPuntosController],
      providers: [CuentaPuntosService],
    }).compile();

    controller = module.get<CuentaPuntosController>(CuentaPuntosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
