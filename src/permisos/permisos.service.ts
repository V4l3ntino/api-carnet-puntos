import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePermisoDto } from './dto/create-permiso.dto';
import { UpdatePermisoDto } from './dto/update-permiso.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permiso } from './entities/permiso.entity';
import { Repository } from 'typeorm';
import { AdminProfileService } from 'src/admin_profile/admin_profile.service';
import { newMessage } from 'functions/functions';

@Injectable()
export class PermisosService {
  
  constructor(
    @InjectRepository(Permiso)
    private readonly permService: Repository<Permiso>,
    private readonly adminProfileService: AdminProfileService 
  ){}
  
  async create(createPermisoDto: CreatePermisoDto) {
    try {
      const admin_profile = await this.adminProfileService.findOne(createPermisoDto.admin_profile_id)
      
      if(!admin_profile){
        throw new NotFoundException('Admin profile not found')
      }
      const perm = this.permService.create(createPermisoDto)
      perm.admin_profile = admin_profile

      this.permService.save(perm)

      return newMessage('Perms created', 200)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.permService.find()
  }

  findOne(id: string) {
    return this.permService.findOne({where: {id}, relations: ['admin_profile']})
  }

  update(id: number, updatePermisoDto: UpdatePermisoDto) {
    return `This action updates a #${id} permiso`;
  }

  remove(id: string) {
    return this.permService.delete(id);
  }
}
