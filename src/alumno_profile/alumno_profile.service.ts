import { Injectable, InternalServerErrorException, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateAlumnoProfileDto } from './dto/create-alumno_profile.dto';
import { UpdateAlumnoProfileDto } from './dto/update-alumno_profile.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { AlumnoProfile } from './entities/alumno_profile.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { PermisosService } from 'src/permisos/permisos.service';
import { calcularEdad, getDateNow, newMessage } from 'functions/functions';
import { v4 as uuidv4 } from 'uuid';
import { CreatePermisoDto } from 'src/permisos/dto/create-permiso.dto';
import { GrupoService } from 'src/grupo/grupo.service';


@Injectable()
export class AlumnoProfileService {
  constructor(
    @InjectRepository(AlumnoProfile)
    private readonly aprofileRepository: Repository<AlumnoProfile>,
    private readonly uService: UserService,
    private readonly permService: PermisosService,
    private readonly grupoService: GrupoService
  ){}

  async create(createAlumnoProfileDto: CreateAlumnoProfileDto) {
    try {
      const {fechaNacimiento, id, repetidor, grupo_id} = createAlumnoProfileDto
      const user = await this.uService.findOne(id)
      const grupo = await this.grupoService.findOne(+grupo_id)
      if(!user || !grupo){
        throw new NotFoundException("Dependencies not found")
      }
      if( user.profesorProfile !== null ){
        throw new NotImplementedException("The user account is a profesor profile, we cant make him a student profile")
      }
      if( user.adminProfile !== null ){
        throw new NotImplementedException("The user account is an administrator, we cant make him a student profile")
      }
      const uuid = uuidv4()
      const permisos: CreatePermisoDto = {
        id: uuid,
        tablas: [
          {
            tipo: "r",
            admin_profile: false,
            alumno_profile: false,
            cuenta_puntos: true,
            grado: false,
            grupo: true,
            incidencia: true,
            permiso_id: uuid,
            permisos: false,
            profesor_profile: false,
            profile: false,
            retrasos: true,
            tablas: false,
            tipo_incidencia: false,
            user: false
          },
          {
            tipo: "w",
            admin_profile: false,
            alumno_profile: true,
            cuenta_puntos: false,
            grado: false,
            grupo: false,
            incidencia: false,
            permiso_id: uuid,
            permisos: false,
            profesor_profile: false,
            profile: false,
            retrasos: false,
            tablas: false,
            tipo_incidencia: false,
            user: false
          },
          {
            tipo: "i",
            admin_profile: false,
            alumno_profile: false,
            cuenta_puntos: false,
            grado: false,
            grupo: false,
            incidencia: false,
            permiso_id: uuid,
            permisos: false,
            profesor_profile: false,
            profile: false,
            retrasos: false,
            tablas: false,
            tipo_incidencia: false,
            user: false
          },
          {
            tipo: "d",
            admin_profile: false,
            alumno_profile: false,
            cuenta_puntos: false,
            grado: false,
            grupo: false,
            incidencia: false,
            permiso_id: uuid,
            permisos: false,
            profesor_profile: false,
            profile: false,
            retrasos: false,
            tablas: false,
            tipo_incidencia: false,
            user: false
          },
        ]
      }
      const permiso = await this.permService.create(permisos)

      const alumnoProfile: AlumnoProfile = new AlumnoProfile()
      alumnoProfile.created_at = getDateNow()
      alumnoProfile.idea = user.id
      alumnoProfile.user = user
      alumnoProfile.permiso = permiso
      alumnoProfile.repetidor = repetidor
      alumnoProfile.edad = calcularEdad(fechaNacimiento)
      alumnoProfile.grupo = grupo
      this.aprofileRepository.save(alumnoProfile);
      

      return newMessage("The user is now a student", 200)
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

  findAll() {
    return this.aprofileRepository.find({relations: ['user', 'permiso', 'permiso.tabla', 'grupo', 'incidencia', 'incidencia.tipoIncidencia.grado']})
  }

  async findOne(idea: string) {
    return await this.aprofileRepository.findOne({where:{idea},relations: ['user', 'permiso', 'permiso.tabla']})
  }

  update(id: string, updateAlumnoProfileDto: UpdateAlumnoProfileDto) {
    return `This action updates a #${id} alumnoProfile`;
  }

  async remove(idea: string) {
    try {
      const alumnoProfile = await this.aprofileRepository.findOne({where: {idea}, relations: ['permiso']})

      await this.aprofileRepository.delete(idea);
      await this.permService.remove(alumnoProfile.permiso.id)
      return newMessage("success", 200)
    } catch (error) {
      throw error
    }
  }
}
