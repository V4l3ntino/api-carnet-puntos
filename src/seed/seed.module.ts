import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from 'src/user/user.module';
import { AdminProfileModule } from 'src/admin_profile/admin_profile.module';
import { GrupoModule } from 'src/grupo/grupo.module';
import { AlumnoProfileModule } from 'src/alumno_profile/alumno_profile.module';
import { ProfesorProfileModule } from 'src/profesor_profile/profesor_profile.module';
import { GradoModule } from 'src/grado/grado.module';
import { TipoIncidenciaModule } from 'src/tipo_incidencia/tipo_incidencia.module';
import { IncidenciaModule } from 'src/incidencia/incidencia.module';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ UserModule,
    AdminProfileModule,
    GrupoModule,
    AlumnoProfileModule,
    ProfesorProfileModule,
    GradoModule,
    TipoIncidenciaModule,
    IncidenciaModule,
    ProfileModule
  ]
})
export class SeedModule {}
