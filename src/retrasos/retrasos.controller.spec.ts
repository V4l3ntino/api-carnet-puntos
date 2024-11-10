import { Test, TestingModule } from '@nestjs/testing';
import { RetrasosController } from './retrasos.controller';
import { RetrasosService } from './retrasos.service';

describe('RetrasosController', () => {
  let controller: RetrasosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RetrasosController],
      providers: [RetrasosService],
    }).compile();

    controller = module.get<RetrasosController>(RetrasosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
