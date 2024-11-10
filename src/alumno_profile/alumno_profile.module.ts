import { Module } from '@nestjs/common';
import { AlumnoProfileService } from './alumno_profile.service';
import { AlumnoProfileController } from './alumno_profile.controller';

@Module({
  controllers: [AlumnoProfileController],
  providers: [AlumnoProfileService],
})
export class AlumnoProfileModule {}
