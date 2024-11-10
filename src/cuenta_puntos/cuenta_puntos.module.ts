import { Module } from '@nestjs/common';
import { CuentaPuntosService } from './cuenta_puntos.service';
import { CuentaPuntosController } from './cuenta_puntos.controller';

@Module({
  controllers: [CuentaPuntosController],
  providers: [CuentaPuntosService],
})
export class CuentaPuntosModule {}
