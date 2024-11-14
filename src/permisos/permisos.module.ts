import { Module } from '@nestjs/common';
import { PermisosService } from './permisos.service';
import { PermisosController } from './permisos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { AdminProfileModule } from 'src/admin_profile/admin_profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Permiso])
  ],
  controllers: [PermisosController],
  providers: [PermisosService],
  exports: [PermisosService]
})
export class PermisosModule {}
