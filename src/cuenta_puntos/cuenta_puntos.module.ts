import { Module } from '@nestjs/common';
import { CuentaPuntosService } from './cuenta_puntos.service';
import { CuentaPuntosController } from './cuenta_puntos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CuentaPunto } from './entities/cuenta_punto.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CuentaPunto]),
  ],
  controllers: [CuentaPuntosController],
  providers: [CuentaPuntosService],
  exports: [CuentaPuntosService]
})
export class CuentaPuntosModule {}
