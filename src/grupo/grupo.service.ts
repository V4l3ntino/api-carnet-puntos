import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from './entities/grupo.entity';
import { UserService } from 'src/user/user.service';
import { getDateNow, newMessage } from 'functions/functions';

@Injectable()
export class GrupoService {

  constructor(
    @InjectRepository(Grupo)
    private readonly gRepository: Repository<Grupo>,
    private readonly uService: UserService
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

      this.gRepository.save(grupo)

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

  remove(id: number) {
    return this.gRepository.delete(id);
  }
}
