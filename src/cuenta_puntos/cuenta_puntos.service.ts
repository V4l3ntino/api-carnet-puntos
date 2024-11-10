import { Injectable } from '@nestjs/common';
import { CreateCuentaPuntoDto } from './dto/create-cuenta_punto.dto';
import { UpdateCuentaPuntoDto } from './dto/update-cuenta_punto.dto';

@Injectable()
export class CuentaPuntosService {
  create(createCuentaPuntoDto: CreateCuentaPuntoDto) {
    return 'This action adds a new cuentaPunto';
  }

  findAll() {
    return `This action returns all cuentaPuntos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cuentaPunto`;
  }

  update(id: number, updateCuentaPuntoDto: UpdateCuentaPuntoDto) {
    return `This action updates a #${id} cuentaPunto`;
  }

  remove(id: number) {
    return `This action removes a #${id} cuentaPunto`;
  }
}
