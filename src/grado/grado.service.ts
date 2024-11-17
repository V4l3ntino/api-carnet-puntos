import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGradoDto } from './dto/create-grado.dto';
import { UpdateGradoDto } from './dto/update-grado.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Grado } from './entities/grado.entity';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/user.service';
import { newMessage } from 'functions/functions';

@Injectable()
export class GradoService {

  constructor(
    @InjectRepository(Grado)
    private readonly gradoRepository: Repository<Grado>,
    private readonly userService: UserService
  ){}

  async create(createGradoDto: CreateGradoDto) {
    try {
      const {user_id, cantidadPuntos, nombre} = createGradoDto
      const user = await this.userService.findOne(user_id)

      if(!user){
        throw new NotFoundException('User not found')
      }

      const grado = new Grado()

      grado.cantidadPuntos = +cantidadPuntos
      grado.nombre = nombre
      grado.user = user

      this.gradoRepository.save(grado)

      return newMessage('success', 200)
    } catch (error) {
      throw error
    }
  }

  findAll() {
    return this.gradoRepository.find();
  }

  findOne(id: number) {
    return this.gradoRepository.findOne({where:{id}});
  }

  update(id: number, updateGradoDto: UpdateGradoDto) {
    return `This action updates a #${id} grado`;
  }

  remove(id: number) {
    return this.gradoRepository.delete(id);
  }
}
