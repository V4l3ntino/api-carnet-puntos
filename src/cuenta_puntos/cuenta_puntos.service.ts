import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateCuentaPuntoDto } from './dto/create-cuenta_punto.dto';
import { UpdateCuentaPuntoDto } from './dto/update-cuenta_punto.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CuentaPunto } from './entities/cuenta_punto.entity';
import { Repository } from 'typeorm';
import { getDateNow, newMessage } from 'functions/functions';

@Injectable()
export class CuentaPuntosService {
  constructor(
    @InjectRepository(CuentaPunto)
    private readonly cpRepository: Repository<CuentaPunto>,
    ){}

  async create(createCuentaPuntoDto: CreateCuentaPuntoDto) {
    try {
      const cuenta = this.cpRepository.create(createCuentaPuntoDto)
      cuenta.created_at = getDateNow()
      await this.cpRepository.save(cuenta)
      return cuenta
    } catch (error) {
      throw error
    }
  }

  saveCuenta(cuenta: CuentaPunto){
    try {
       this.cpRepository.save(cuenta)
      return newMessage("success", 200)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.cpRepository.find();
  }

  findOne(id: string) {
    return this.cpRepository.findOne({where: {id}});
  }

  update(id: string, updateCuentaPuntoDto: UpdateCuentaPuntoDto) {
    return `This action updates a #${id} cuentaPunto`;
  }

  remove(id: string) {
    return this.cpRepository.delete(id);
  }
}
