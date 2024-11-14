import { Injectable } from '@nestjs/common';
import { CreateCuentaPuntoDto } from './dto/create-cuenta_punto.dto';
import { UpdateCuentaPuntoDto } from './dto/update-cuenta_punto.dto';
import { format } from 'date-fns';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentaPunto } from './entities/cuenta_punto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CuentaPuntosService {
  constructor(
    @InjectRepository(CuentaPunto)
    private readonly cpRepository: Repository<CuentaPunto>
  ){}

  create(createCuentaPuntoDto: CreateCuentaPuntoDto) {
    const fechaActual = new Date();
    const fechaFormateada = format(fechaActual, "yyyy-MM-dd'T'HH:mm");
    try {
      const cuenta = this.cpRepository.create(createCuentaPuntoDto)
      cuenta.created_at = fechaFormateada
      this.cpRepository.save(cuenta)
    } catch (error) {
      
    }
  }

  findAll() {
    return this.cpRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} cuentaPunto`;
  }

  update(id: number, updateCuentaPuntoDto: UpdateCuentaPuntoDto) {
    return `This action updates a #${id} cuentaPunto`;
  }

  remove(id: string) {
    return this.cpRepository.delete(id);
  }
}
