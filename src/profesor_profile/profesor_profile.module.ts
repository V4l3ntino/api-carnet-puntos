import { Module } from '@nestjs/common';
import { ProfesorProfileService } from './profesor_profile.service';
import { ProfesorProfileController } from './profesor_profile.controller';

@Module({
  controllers: [ProfesorProfileController],
  providers: [ProfesorProfileService],
})
export class ProfesorProfileModule {}
