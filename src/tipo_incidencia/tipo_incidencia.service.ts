import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTipoIncidenciaDto } from './dto/create-tipo_incidencia.dto';
import { UpdateTipoIncidenciaDto } from './dto/update-tipo_incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { TipoIncidencia } from './entities/tipo_incidencia.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { GradoService } from 'src/grado/grado.service';
import { getDateNow, newMessage } from 'functions/functions';

@Injectable()
export class TipoIncidenciaService {

  constructor(
    @InjectRepository(TipoIncidencia)
    private readonly tiRepository: Repository<TipoIncidencia>,
    private readonly userService: UserService,
    private readonly gradoService: GradoService
  ){}

  async create(createTipoIncidenciaDto: CreateTipoIncidenciaDto) {
    try {
      const {descripcion, grado, user_id, id} = createTipoIncidenciaDto

      const user = await this.userService.findOne(user_id)
      const gradoObj = await this.gradoService.findOne(grado)
      if(!user || !gradoObj){
        throw new NotFoundException('Dependencies not found')
      }

      const tipoIncidencia = new TipoIncidencia()
      tipoIncidencia.id = id
      tipoIncidencia.descripcion = descripcion
      tipoIncidencia.grado = gradoObj
      tipoIncidencia.user = user
      tipoIncidencia.created_at = getDateNow()

      this.tiRepository.save(tipoIncidencia)

      return newMessage('success', 200)
    } catch (error) {
      return error
    }
  }

  findAll() {
    return this.tiRepository.find({relations: ['grado', 'incidencia']});
  }

  findOne(id: string) {
    return this.tiRepository.findOne({where: {id}, relations: ['grado']});
  }

  update(id: string, updateTipoIncidenciaDto: UpdateTipoIncidenciaDto) {
    return `This action updates a #${id} tipoIncidencia`;
  }

  remove(id: string) {
    return this.tiRepository.delete(id)
  }
}
