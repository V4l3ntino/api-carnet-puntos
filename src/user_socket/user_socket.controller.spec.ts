import { Test, TestingModule } from '@nestjs/testing';
import { UserSocketController } from './user_socket.controller';
import { UserSocketService } from './user_socket.service';

describe('UserSocketController', () => {
  let controller: UserSocketController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserSocketController],
      providers: [UserSocketService],
    }).compile();

    controller = module.get<UserSocketController>(UserSocketController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
