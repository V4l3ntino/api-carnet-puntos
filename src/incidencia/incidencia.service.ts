import { forwardRef, Inject, Injectable, NotFoundException, NotImplementedException } from '@nestjs/common';
import { CreateIncidenciaDto } from './dto/create-incidencia.dto';
import { UpdateIncidenciaDto } from './dto/update-incidencia.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Incidencia } from './entities/incidencia.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { AlumnoProfileService } from 'src/alumno_profile/alumno_profile.service';
import { TipoIncidenciaService } from 'src/tipo_incidencia/tipo_incidencia.service';
import { getDateNow, newMessage } from 'functions/functions';
import { CuentaPuntosService } from 'src/cuenta_puntos/cuenta_puntos.service';
import { WebsocketsGateway } from 'src/websockets/websockets.gateway';

@Injectable()
export class IncidenciaService {
  constructor(
    @InjectRepository(Incidencia)
    private readonly iRepository: Repository<Incidencia>,
    private readonly userService: UserService,
    private readonly alumnoService: AlumnoProfileService,
    private readonly tiService: TipoIncidenciaService,
    private readonly cuentaPuntosService: CuentaPuntosService,
    @Inject(forwardRef(() => WebsocketsGateway))
    private readonly webSocket: WebsocketsGateway 
  ){}

  async create(createIncidenciaDto: CreateIncidenciaDto) {
    try {
      const {user_id, descripcion, tipoIncidencia, alumno_id, id} = createIncidenciaDto

      const user = await this.userService.findOne(user_id)
      const alumnoProfile = await this.alumnoService.findOne(alumno_id)
      const tipoIncidenciaObj = await this.tiService.findOne(tipoIncidencia)
      if(!user || !tipoIncidencia || !alumnoProfile){
        throw new NotFoundException('Dependencies not found')
      }

      const incidencia: Incidencia = new Incidencia()
      incidencia.id = id
      incidencia.alumnoProfile = alumnoProfile
      incidencia.user = user
      incidencia.descripcion = descripcion,
      incidencia.created_at = getDateNow()
      incidencia.tipoIncidencia = tipoIncidenciaObj

      alumnoProfile.cuentaPuntos.cantidad -= tipoIncidenciaObj.grado.cantidadPuntos;
      const response = this.cuentaPuntosService.saveCuenta(alumnoProfile.cuentaPuntos)
      
      if(response.status != 200){
        throw new NotImplementedException('cannot access to the cuenta puntos of student')
      }
      await this.iRepository.save(incidencia)

      //Comunico a los demás clientes
      this.webSocket.incidenciasEmit(incidencia)

      return incidencia

    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.iRepository.find({relations: ['user', 'user.profile', 'alumnoProfile', 'alumnoProfile.user.profile', 'tipoIncidencia', 'tipoIncidencia.grado']});
  }

  findOne(id: string) {
    return this.iRepository.findOne({where: {id}, relations: ['user', 'user.profile', 'alumnoProfile', 'alumnoProfile.user.profile', 'tipoIncidencia', 'tipoIncidencia.grado']});
  }

  update(id: string, updateIncidenciaDto: UpdateIncidenciaDto) {
    return `This action updates a #${id} incidencia`;
  }

  remove(id: string) {
    this.iRepository.delete(id);
    this.webSocket.incidenciasDelete(id)
    return
  }
}
