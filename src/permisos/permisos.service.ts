import { Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';
import { AdminProfileService } from 'src/admin_profile/admin_profile.service';
import { newMessage } from 'functions/functions';
import { CreateTablaDto } from 'src/tablas/dto/create-tabla.dto';

@Injectable()
export class PermisosService {
  
  constructor(
    @InjectRepository(Permiso)
    private readonly permRepository: Repository<Permiso>
    ){}
  
  async create(createPermisoDto: CreatePermisoDto) {
    try {
      const perm = this.permRepository.create(createPermisoDto)

      this.permRepository.save(perm)

      const tablas: CreateTablaDto = {
        id: perm.id,
        admin_profile: true,
        profile: true,
        user: true,
        alumno_profile: true,
        profesor_profile: true,
        incidencia: true,
        grado: true,
        tipo_incidencia: true,
        permisos: true,
        tablas: true,
        cuenta_puntos: true,
        retrasos: true,
        grupo: true,
        permiso_id: perm.id
      }

      const request = await fetch('http://localhost:3000/api/tablas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(tablas)
      })

      const requestData = await request.json()
      console.log("request tablas ",requestData)
      if(requestData.status !== 200){
        throw new NotImplementedException('Permissions cannot be implemented')
      }

      return perm
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.permRepository.find()
  }

  findOne(id: string) {
    return this.permRepository.findOne({where: {id}, relations: ['admin_profile']})
  }

  update(id: number, updatePermisoDto: UpdatePermisoDto) {
    return `This action updates a #${id} permiso`;
  }

  remove(id: string) {
    return this.permRepository.delete(id);
  }
}
