import { Module } from '@nestjs/common';
import { AdminProfileService } from './admin_profile.service';
import { AdminProfileController } from './admin_profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { AdminProfile } from './entities/admin_profile.entity';
import { PermisosModule } from 'src/permisos/permisos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AdminProfile]),
    UserModule,
    PermisosModule
  ],
  controllers: [AdminProfileController],
  providers: [AdminProfileService],
  exports: [AdminProfileService]
})
export class AdminProfileModule {}
