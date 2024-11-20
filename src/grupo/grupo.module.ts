import { Module } from '@nestjs/common';
import { GrupoService } from './grupo.service';
import { GrupoController } from './grupo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grupo } from './entities/grupo.entity';
import { UserModule } from 'src/user/user.module';
import { CuentaPuntosModule } from 'src/cuenta_puntos/cuenta_puntos.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Grupo]),
    UserModule, CuentaPuntosModule
  ],
  controllers: [GrupoController],
  providers: [GrupoService],
  exports: [GrupoService]
})
export class GrupoModule {}
