import { Module } from '@nestjs/common';
import { UserSocketService } from './user_socket.service';
import { UserSocketController } from './user_socket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSocket } from './entities/user_socket.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSocket]),
  ],
  controllers: [UserSocketController],
  providers: [UserSocketService],
  exports: [UserSocketService],
})
export class UserSocketModule {}
