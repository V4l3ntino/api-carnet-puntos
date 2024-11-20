import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from './entities/grupo.entity';
import { UserService } from 'src/user/user.service';
import { getDateNow, newMessage } from 'functions/functions';
import { CuentaPunto } from 'src/cuenta_puntos/entities/cuenta_punto.entity';
import { CreateCuentaPuntoDto } from 'src/cuenta_puntos/dto/create-cuenta_punto.dto';
import { CuentaPuntosService } from 'src/cuenta_puntos/cuenta_puntos.service';

@Injectable()
export class GrupoService {

  constructor(
    @InjectRepository(Grupo)
    private readonly gRepository: Repository<Grupo>,
    private readonly uService: UserService,
    
    private readonly cuentaPuntosService: CuentaPuntosService
  ){}

  async create(createGrupoDto: CreateGrupoDto) {
    try {
      const {id, nombre, uuid} = createGrupoDto
      const user = await this.uService.findOne(uuid)

      if(!user){
        throw new NotFoundException("User account not found")
      }

      const grupo = new Grupo()
      grupo.id = +id
      grupo.nombre = nombre
      grupo.user = user
      grupo.created_at = getDateNow()

      const cuentaPuntos: CreateCuentaPuntoDto = {
        id,
        cantidad: 12
      }
      const cuenta: CuentaPunto = await this.cuentaPuntosService.create(cuentaPuntos)

      grupo.cuentaPuntos = cuenta
      await this.gRepository.save(grupo)

      return newMessage('success', 200)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.gRepository.find({relations: ['alumnos', 'profesor']});
  }

  async findOne(id: number) {
    return await this.gRepository.findOne({where: {id}});
  }

  update(id: number, updateGrupoDto: UpdateGrupoDto) {
    return `This action updates a #${id} grupo`;
  }

  async remove(id: number) {
    try {
      await this.gRepository.delete(id);
      await this.cuentaPuntosService.remove(id.toString())
      return newMessage("success", 200)
    } catch (error) {
      throw error
    }
  }
}
