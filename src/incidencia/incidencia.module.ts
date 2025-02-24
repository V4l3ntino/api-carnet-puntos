import { forwardRef, Module } from '@nestjs/common';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaController } from './incidencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { UserModule } from 'src/user/user.module';
import { AlumnoProfileModule } from 'src/alumno_profile/alumno_profile.module';
import { TipoIncidenciaModule } from 'src/tipo_incidencia/tipo_incidencia.module';
import { CuentaPuntosModule } from 'src/cuenta_puntos/cuenta_puntos.module';
import { IncidenciaResolver } from './incidencia.resolver';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';
import { GateWayModule } from 'src/websockets/websockets.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidencia]),
    UserModule, AlumnoProfileModule, TipoIncidenciaModule, CuentaPuntosModule, forwardRef(() => GateWayModule)
  ],
  controllers: [IncidenciaController],
  providers: [IncidenciaService, IncidenciaResolver],
  exports: [IncidenciaService]
})
export class IncidenciaModule {}
