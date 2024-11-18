import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { UserModule } from 'src/user/user.module';
import { AdminProfileModule } from 'src/admin_profile/admin_profile.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ UserModule, AdminProfileModule]
})
export class SeedModule {}
