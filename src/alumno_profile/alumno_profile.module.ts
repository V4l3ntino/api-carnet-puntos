import { forwardRef, Module } from '@nestjs/common';
import { AlumnoProfileService } from './alumno_profile.service';
import { AlumnoProfileController } from './alumno_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoProfile } from './entities/alumno_profile.entity';
import { UserModule } from 'src/user/user.module';
import { PermisosModule } from 'src/permisos/permisos.module';
import { GrupoModule } from 'src/grupo/grupo.module';
import { CuentaPuntosModule } from 'src/cuenta_puntos/cuenta_puntos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlumnoProfile]),
    UserModule, PermisosModule, GrupoModule, CuentaPuntosModule 
  ],
  controllers: [AlumnoProfileController],
  providers: [AlumnoProfileService],
  exports: [AlumnoProfileService]
})
export class AlumnoProfileModule {}
