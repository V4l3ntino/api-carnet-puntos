import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { AlumnoProfileService } from 'src/alumno_profile/alumno_profile.service';
import { TipoIncidenciaService } from 'src/tipo_incidencia/tipo_incidencia.service';
import { getDateNow, newMessage } from 'functions/functions';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly iRepository: Repository<Incidencia>,
    private readonly userService: UserService,
    private readonly alumnoService: AlumnoProfileService,
    private readonly tiService: TipoIncidenciaService
  ){}

  async create(createIncidenciaDto: CreateIncidenciaDto) {
    try {
      const {user_id, descripcion, tipoIncidencia, alumno_id, id} = createIncidenciaDto

      const user = await this.userService.findOne(user_id)
      const alumnoProfile = await this.alumnoService.findOne(alumno_id)
      const tipoIncidenciaObj = await this.tiService.findOne(+tipoIncidencia)
      if(!user || !tipoIncidencia || !alumnoProfile){
        throw new NotFoundException('Dependencies not found')
      }

      const incidencia: Incidencia = new Incidencia()
      incidencia.id = +id
      incidencia.alumnoProfile = alumnoProfile
      incidencia.user = user
      incidencia.descripcion = descripcion,
      incidencia.created_at = getDateNow()
      incidencia.tipoIncidencia = tipoIncidenciaObj

      this.iRepository.save(incidencia)
      return newMessage('success', 200)

    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.iRepository.find({relations: ['user', 'alumnoProfile', 'tipoIncidencia', 'tipoIncidencia.grado']});
  }

  findOne(id: number) {
    return this.iRepository.findOneBy({id});
  }

  update(id: number, updateIncidenciaDto: UpdateIncidenciaDto) {
    return `This action updates a #${id} incidencia`;
  }

  remove(id: number) {
    return this.iRepository.delete(id);
  }
}
