import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';
import { AdminProfileService } from 'src/admin_profile/admin_profile.service';
import { createTables, newMessage } from 'functions/functions';
import { CreateTablaDto } from 'src/tablas/dto/create-tabla.dto';

@Injectable()
export class PermisosService {
  
  constructor(
    @InjectRepository(Permiso)
    private readonly permRepository: Repository<Permiso>
    ){}
  
  async create(createPermisoDto: CreatePermisoDto) {
    try {
      const {id, tablas} = createPermisoDto
      const permiso = new Permiso()
      permiso.id = id

      this.permRepository.save(permiso)

      
      // const request = await fetch('http://localhost:3000/api/tablas', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(tablas)
      // })
      const promesas:Promise<messageResponse>[] = tablas.map((tabla) => {return createTables(tabla)})
      await Promise.all(promesas)

      return permiso
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.permRepository.find()
  }

  findOne(id: string) {
    return this.permRepository.findOne({where: {id}, relations: ['admin_profile', 'profesor_profile']})
  }

  update(id: number, updatePermisoDto: UpdatePermisoDto) {
    return `This action updates a #${id} permiso`;
  }

  remove(id: string) {
    return this.permRepository.delete(id);
  }
}
