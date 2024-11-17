import { Module } from '@nestjs/common';
import { AlumnoProfileService } from './alumno_profile.service';
import { AlumnoProfileController } from './alumno_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AlumnoProfile } from './entities/alumno_profile.entity';
import { UserModule } from 'src/user/user.module';
import { PermisosModule } from 'src/permisos/permisos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AlumnoProfile]),
    UserModule, PermisosModule
  ],
  controllers: [AlumnoProfileController],
  providers: [AlumnoProfileService],
})
export class AlumnoProfileModule {}
