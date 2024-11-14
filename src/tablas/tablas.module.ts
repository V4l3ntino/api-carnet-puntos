import { Module } from '@nestjs/common';
import { TablasService } from './tablas.service';
import { TablasController } from './tablas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tabla } from './entities/tabla.entity';
import { PermisosModule } from 'src/permisos/permisos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Tabla]),
    PermisosModule
  ],
  controllers: [TablasController],
  providers: [TablasService],
})
export class TablasModule {}
