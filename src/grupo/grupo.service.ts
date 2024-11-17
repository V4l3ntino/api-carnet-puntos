import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGrupoDto } from './dto/create-grupo.dto';
import { UpdateGrupoDto } from './dto/update-grupo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grupo } from './entities/grupo.entity';
import { UserService } from 'src/user/user.service';
import { newMessage } from 'functions/functions';

@Injectable()
export class GrupoService {

  constructor(
    @InjectRepository(Grupo)
    private readonly gRepository: Repository<Grupo>,
    private readonly uService: UserService
  ){}

  async create(createGrupoDto: CreateGrupoDto) {
    try {
      const {id, nombre} = createGrupoDto
      const user = await this.uService.findOne(id)

      if(!user){
        throw new NotFoundException("User account not found")
      }

      const grupo = this.gRepository.create(createGrupoDto)
      grupo.user = user

      this.gRepository.save(grupo)

      return newMessage('success', 200)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.gRepository.find();
  }

  findOne(id: string) {
    return this.gRepository.findOne({where: {id}});
  }

  update(id: string, updateGrupoDto: UpdateGrupoDto) {
    return `This action updates a #${id} grupo`;
  }

  remove(id: string) {
    return this.gRepository.delete(id);
  }
}
