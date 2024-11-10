import { Injectable } from '@nestjs/common';
import { CreateAlumnoProfileDto } from './dto/create-alumno_profile.dto';
import { UpdateAlumnoProfileDto } from './dto/update-alumno_profile.dto';

@Injectable()
export class AlumnoProfileService {
  create(createAlumnoProfileDto: CreateAlumnoProfileDto) {
    return 'This action adds a new alumnoProfile';
  }

  findAll() {
    return `This action returns all alumnoProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} alumnoProfile`;
  }

  update(id: number, updateAlumnoProfileDto: UpdateAlumnoProfileDto) {
    return `This action updates a #${id} alumnoProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} alumnoProfile`;
  }
}
