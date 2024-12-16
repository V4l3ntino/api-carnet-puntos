import { Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateProfesorProfileDto } from './dto/create-profesor_profile.dto';
import { UpdateProfesorProfileDto } from './dto/update-profesor_profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfesorProfile } from './entities/profesor_profile.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PermisosService } from 'src/permisos/permisos.service';
import { CreatePermisoDto } from 'src/permisos/dto/create-permiso.dto';
import { getDateNow, newMessage } from 'functions/functions';
import { GrupoService } from 'src/grupo/grupo.service';

@Injectable()
export class ProfesorProfileService {

  constructor(
    @InjectRepository(ProfesorProfile)
    private readonly pprofileRepository: Repository<ProfesorProfile>,
    private readonly userService: UserService,
    private readonly permisoService: PermisosService,
    private readonly grupoService: GrupoService
  ){}

  async create(createProfesorProfileDto: CreateProfesorProfileDto) {
    try {
      const { id, materia, tablas, grupo_id } = createProfesorProfileDto

      const user = await this.userService.findOne(id)
      const grupo = await this.grupoService.findOne(+grupo_id)

      if(!user || !grupo){
        throw new NotFoundException("Dependencies not found")
      }

      if(user.alumnoProfile !== null){
        throw new NotImplementedException("The user account is a student, we cant make him a profesor profile")
      }

      const permisos: CreatePermisoDto = {
        id: user.id,
        tablas
      }

      const permiso = await this.permisoService.create(permisos)

      const profesorProfile: ProfesorProfile = new ProfesorProfile()

      profesorProfile.idea = user.id
      profesorProfile.created_at = getDateNow()
      profesorProfile.materia = materia
      profesorProfile.user = user
      profesorProfile.permiso = permiso
      profesorProfile.grupo = grupo

      this.pprofileRepository.save(profesorProfile)

      return newMessage('The user is now a Profesor', 200)

    } catch (error) {
      if(error instanceof NotFoundException){
        throw error
      }
      if(error instanceof NotImplementedException){
        throw error
      }
      console.log(error)
      throw new InternalServerErrorException("User could not be logged in as profesor")    }
  }

  findAll() {
    return this.pprofileRepository.find({relations: ['user', 'user.profile', 'permiso', 'permiso.tabla', 'grupo', 'grupo.alumnos']})
  }

  findOne(idea: string) {
    return this.pprofileRepository.findOne({where: {idea}, relations: ['user', 'permiso', 'permiso.tabla']})
  }

  update(id: string, updateProfesorProfileDto: UpdateProfesorProfileDto) {
    return `This action updates a #${id} profesorProfile`;
  }

  async remove(idea: string) {
    try {
      const profesorProfile = await this.pprofileRepository.findOne({where: {idea}, relations: ['permiso']})

      await this.pprofileRepository.delete(idea);
      await this.permisoService.remove(profesorProfile.permiso.id)
      return newMessage("success", 200)
    } catch (error) {
      throw error
    }
  }
}
