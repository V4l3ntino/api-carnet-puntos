import { Test, TestingModule } from '@nestjs/testing';
import { TablasController } from './tablas.controller';
import { TablasService } from './tablas.service';

describe('TablasController', () => {
  let controller: TablasController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TablasController],
      providers: [TablasService],
    }).compile();

    controller = module.get<TablasController>(TablasController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
