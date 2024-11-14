import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTablaDto } from './dto/create-tabla.dto';
import { UpdateTablaDto } from './dto/update-tabla.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tabla } from './entities/tabla.entity';
import { Repository } from 'typeorm';
import { PermisosService } from 'src/permisos/permisos.service';
import { newMessage } from 'functions/functions';

@Injectable()
export class TablasService {

  constructor(
    @InjectRepository(Tabla)
    private readonly tablaRepository: Repository<Tabla>,
    private readonly permisoService: PermisosService
  ){}

  async create(createTablaDto: CreateTablaDto) {
    try {
      const permiso = await this.permisoService.findOne(createTablaDto.permiso_id)
      if(!permiso){
        throw new NotFoundException()
      }
      const tabla = this.tablaRepository.create(createTablaDto)
      tabla.permiso = permiso
      this.tablaRepository.save(tabla)
      return newMessage("success", 200)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.tablaRepository.find();
  }

  findOne(id: string) {
    return this.tablaRepository.findOneBy({id});
  }

  update(id: string, updateTablaDto: UpdateTablaDto) {
    return `This action updates a #${id} tabla`;
  }

  remove(id: string) {
    return this.tablaRepository.delete(id)
  }
}
