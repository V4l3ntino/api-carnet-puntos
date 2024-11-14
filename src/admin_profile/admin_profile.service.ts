import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
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
    private readonly adminService: Repository<AdminProfile>,
    private readonly uService: UserService,
    private readonly permService: PermisosService
    ){}

  async create(createAdminProfileDto: CreateAdminProfileDto) {
    try {
      const user = await this.uService.findOne(createAdminProfileDto.user)
      if(!user){
        throw new NotFoundException("User not found")
      }

      const permisos: CreatePermisoDto = {
        id: user.id,
        delete: true,
        insert: true,
        read: true, 
        write: true
      }
      const perm = this.permService.create(permisos)

      // const request = await fetch('http://localhost:3000/api/profile/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'  
      //   },
      //   body: JSON.stringify(permisos)
      // })

      // const requestData = await request.json()
      // console.log(requestData)

      const fechaActual = new Date();
      const fechaFormateada = format(fechaActual, "yyyy-MM-dd'T'HH:mm");

      const adminProfile = this.adminService.create(createAdminProfileDto)
      adminProfile.created_at = fechaFormateada
      adminProfile.idea = user.id
      adminProfile.permiso = perm
      this.adminService.save(adminProfile);
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
      return await this.adminService.find({relations: ['user','permiso']})
    } catch (error) {
      throw new InternalServerErrorException("Error to find all admins profiles")
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} adminProfile`;
  }

  update(id: number, updateAdminProfileDto: UpdateAdminProfileDto) {
    return `This action updates a #${id} adminProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} adminProfile`;
  }
}
