import { Module } from '@nestjs/common';
import { RetrasosService } from './retrasos.service';
import { RetrasosController } from './retrasos.controller';

@Module({
  controllers: [RetrasosController],
  providers: [RetrasosService],
})
export class RetrasosModule {}
