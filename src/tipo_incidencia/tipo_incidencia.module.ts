import { Module } from '@nestjs/common';
import { TipoIncidenciaService } from './tipo_incidencia.service';
import { TipoIncidenciaController } from './tipo_incidencia.controller';

@Module({
  controllers: [TipoIncidenciaController],
  providers: [TipoIncidenciaService],
})
export class TipoIncidenciaModule {}
