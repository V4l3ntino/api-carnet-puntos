import { Module } from '@nestjs/common';
import { IncidenciaService } from './incidencia.service';
import { IncidenciaController } from './incidencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { UserModule } from 'src/user/user.module';
import { AlumnoProfileModule } from 'src/alumno_profile/alumno_profile.module';
import { TipoIncidenciaModule } from 'src/tipo_incidencia/tipo_incidencia.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Incidencia]),
    UserModule, AlumnoProfileModule, TipoIncidenciaModule
  ],
  controllers: [IncidenciaController],
  providers: [IncidenciaService],
  exports: [IncidenciaService]
})
export class IncidenciaModule {}
