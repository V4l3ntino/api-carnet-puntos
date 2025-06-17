import { forwardRef, Module } from '@nestjs/common';
import { TipoIncidenciaService } from './tipo_incidencia.service';
import { TipoIncidenciaController } from './tipo_incidencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoIncidencia } from './entities/tipo_incidencia.entity';
import { UserModule } from 'src/user/user.module';
import { GradoModule } from 'src/grado/grado.module';
import { GateWayModule } from 'src/websockets/websockets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoIncidencia]),
    UserModule, GradoModule, forwardRef(() => GateWayModule)
  ],
  controllers: [TipoIncidenciaController],
  providers: [TipoIncidenciaService],
  exports: [TipoIncidenciaService]
})
export class TipoIncidenciaModule {}
