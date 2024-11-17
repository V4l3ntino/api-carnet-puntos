import { Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateAdminProfileDto } from './dto/create-admin_profile.dto';
import { UpdateAdminProfileDto } from './dto/update-admin_profile.dto';
import { Repository } from 'typeorm';
import { AdminProfile } from './entities/admin_profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { newMessage } from 'functions/functions';
import { format } from 'date-fns';
import { Permiso } from 'src/permisos/entities/permiso.entity';
import { CreatePermisoDto } from 'src/permisos/dto/create-permiso.dto';
import { PermisosService } from 'src/permisos/permisos.service';

@Injectable()
export class AdminProfileService {

  constructor(
    @InjectRepository(AdminProfile)
    private readonly adminRepository: Repository<AdminProfile>,
    private readonly uService: UserService,    
    private readonly permService: PermisosService
  ){}

  async create(createAdminProfileDto: CreateAdminProfileDto) {
    try {
      const user = await this.uService.findOne(createAdminProfileDto.user_id)
      if(!user){
        throw new NotFoundException("User not found")
      }
      const permisos: CreatePermisoDto = {
        id: user.id,
        tablas: [
          {
            tipo: "r",
            admin_profile: true,
            alumno_profile: true,
            cuenta_puntos: true,
            grado: true,
            grupo: true,
            incidencia: true,
            permiso_id: user.id,
            permisos: true,
            profesor_profile: true,
            profile: true,
            retrasos: true,
            tablas: true,
            tipo_incidencia: true,
            user: true
          },
          {
            tipo: "w",
            admin_profile: true,
            alumno_profile: true,
            cuenta_puntos: true,
            grado: true,
            grupo: true,
            incidencia: true,
            permiso_id: user.id,
            permisos: true,
            profesor_profile: true,
            profile: true,
            retrasos: true,
            tablas: true,
            tipo_incidencia: true,
            user: true
          },
          {
            tipo: "i",
            admin_profile: true,
            alumno_profile: true,
            cuenta_puntos: true,
            grado: true,
            grupo: true,
            incidencia: true,
            permiso_id: user.id,
            permisos: true,
            profesor_profile: true,
            profile: true,
            retrasos: true,
            tablas: true,
            tipo_incidencia: true,
            user: true
          },
          {
            tipo: "d",
            admin_profile: true,
            alumno_profile: true,
            cuenta_puntos: true,
            grado: true,
            grupo: true,
            incidencia: true,
            permiso_id: user.id,
            permisos: true,
            profesor_profile: true,
            profile: true,
            retrasos: true,
            tablas: true,
            tipo_incidencia: true,
            user: true
          },
        ]
      }
      const permiso = await this.permService.create(permisos)

      const fechaActual = new Date();
      const fechaFormateada = format(fechaActual, "yyyy-MM-dd'T'HH:mm");

      const adminProfile: AdminProfile = new AdminProfile()
      adminProfile.created_at = fechaFormateada
      adminProfile.idea = user.id
      adminProfile.user = user
      adminProfile.permiso = permiso
      this.adminRepository.save(adminProfile);
      

      return newMessage("The user is now an administrator", 200)
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException("User could not be logged in as administrator")
    }
  }

  async findAll() {
    try {
      return await this.adminRepository.find({relations: ['user','permiso', 'permiso.tabla']})
    } catch (error) {
      throw new InternalServerErrorException("Error to find all admins profiles")
    }
  }

  findOne(idea: string) {
    return this.adminRepository.findOne({where: {idea}, relations: ['user', 'permiso']})
  }

  update(id: number, updateAdminProfileDto: UpdateAdminProfileDto) {
    return `This action updates a #${id} adminProfile`;
  }

  async remove(id: string) {
    try {
      await this.adminRepository.delete(id);
      await this.permService.remove(id)
      return newMessage("success", 200)
    } catch (error) {
      throw error
    }
  }
}
