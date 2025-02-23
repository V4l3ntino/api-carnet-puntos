import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PermisosModule } from 'src/permisos/permisos.module';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    PermisosModule,
    forwardRef(() => ProfileModule)
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
