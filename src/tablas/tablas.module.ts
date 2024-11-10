import { Module } from '@nestjs/common';
import { TablasService } from './tablas.service';
import { TablasController } from './tablas.controller';

@Module({
  controllers: [TablasController],
  providers: [TablasService],
})
export class TablasModule {}
