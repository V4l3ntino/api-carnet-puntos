import { forwardRef, Global, Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';
import { UserModule } from 'src/user/user.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Profile]),
    forwardRef(() => UserModule)
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService]
})
export class ProfileModule {}
