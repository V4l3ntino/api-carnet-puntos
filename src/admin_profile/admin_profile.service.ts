import { Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateAdminProfileDto } from './dto/create-admin_profile.dto';
import { UpdateAdminProfileDto } from './dto/update-admin_profile.dto';
import { Repository } from 'typeorm';
import { AdminProfile } from './entities/admin_profile.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { getDateNow, newMessage } from 'functions/functions';
import { CreatePermisoDto } from 'src/permisos/dto/create-permiso.dto';
import { PermisosService } from 'src/permisos/permisos.service';
import { v4 as uuidv4 } from 'uuid';

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
      if( user.alumnoProfile !== null ){
        throw new NotImplementedException("The user account is a student, we cant make him an administrator")
      }
      const uuid = uuidv4()
      const permisos: CreatePermisoDto = {
        id: uuid,
        tablas: [
          {
            tipo: "r",
            admin_profile: true,
            alumno_profile: true,
            cuenta_puntos: true,
            grado: true,
            grupo: true,
            incidencia: true,
            permiso_id: uuid,
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
            permiso_id: uuid,
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
            permiso_id: uuid,
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
            permiso_id: uuid,
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

      const adminProfile: AdminProfile = new AdminProfile()
      adminProfile.created_at = getDateNow()
      adminProfile.idea = user.id
      adminProfile.user = user
      adminProfile.permiso = permiso
      this.adminRepository.save(adminProfile);
      

      return newMessage("The user is now an administrator", 200)
    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      if(error instanceof NotImplementedException){
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
    return this.adminRepository.findOne({where: {idea}, relations: ['user', 'permiso', 'permiso.tabla']})
  }

  update(id: number, updateAdminProfileDto: UpdateAdminProfileDto) {
    return `This action updates a #${id} adminProfile`;
  }

  async remove(idea: string) {
    try {
      const adminProfile = await this.adminRepository.findOne({where: {idea}, relations: ['permiso']})

      await this.adminRepository.delete(idea);
      await this.permService.remove(adminProfile.permiso.id)
      return newMessage("success", 200)
    } catch (error) {
      throw error
    }
  }
}
