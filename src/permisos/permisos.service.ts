import { Injectable } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermisosService {
  
  constructor(
    @InjectRepository(Permiso)
    private readonly permService: Repository<Permiso> 
  ){}
  
  create(createPermisoDto: CreatePermisoDto) {
    const perm = this.permService.create(createPermisoDto)
    try {
      this.permService.save(createPermisoDto)
      return perm;
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return `This action returns all permisos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} permiso`;
  }

  update(id: number, updatePermisoDto: UpdatePermisoDto) {
    return `This action updates a #${id} permiso`;
  }

  remove(id: number) {
    return `This action removes a #${id} permiso`;
  }
}
