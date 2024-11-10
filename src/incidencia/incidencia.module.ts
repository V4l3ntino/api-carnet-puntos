import { Module } from '@nestjs/common';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaController } from './incidencia.controller';

@Module({
  controllers: [IncidenciaController],
  providers: [IncidenciaService],
})
export class IncidenciaModule {}
