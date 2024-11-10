import { Module } from '@nestjs/common';
import { AdminProfileService } from './admin_profile.service';
import { AdminProfileController } from './admin_profile.controller';

@Module({
  controllers: [AdminProfileController],
  providers: [AdminProfileService],
})
export class AdminProfileModule {}
