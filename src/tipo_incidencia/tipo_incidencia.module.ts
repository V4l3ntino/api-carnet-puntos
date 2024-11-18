import { Module } from '@nestjs/common';
import { TipoIncidenciaService } from './tipo_incidencia.service';
import { TipoIncidenciaController } from './tipo_incidencia.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoIncidencia } from './entities/tipo_incidencia.entity';
import { UserModule } from 'src/user/user.module';
import { GradoModule } from 'src/grado/grado.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TipoIncidencia]),
    UserModule, GradoModule
  ],
  controllers: [TipoIncidenciaController],
  providers: [TipoIncidenciaService],
  exports: [TipoIncidenciaService]
})
export class TipoIncidenciaModule {}
