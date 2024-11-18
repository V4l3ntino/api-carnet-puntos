import { Module } from '@nestjs/common';
import { ProfesorProfileService } from './profesor_profile.service';
import { ProfesorProfileController } from './profesor_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProfesorProfile } from './entities/profesor_profile.entity';
import { UserModule } from 'src/user/user.module';
import { PermisosModule } from 'src/permisos/permisos.module';
import { GrupoModule } from 'src/grupo/grupo.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfesorProfile]),
    UserModule, PermisosModule, GrupoModule
  ],
  controllers: [ProfesorProfileController],
  providers: [ProfesorProfileService],
  exports: [ProfesorProfileService]
})
export class ProfesorProfileModule {}
