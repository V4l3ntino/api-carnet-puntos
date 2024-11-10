import { Injectable } from '@nestjs/common';
import { CreateProfesorProfileDto } from './dto/create-profesor_profile.dto';
import { UpdateProfesorProfileDto } from './dto/update-profesor_profile.dto';

@Injectable()
export class ProfesorProfileService {
  create(createProfesorProfileDto: CreateProfesorProfileDto) {
    return 'This action adds a new profesorProfile';
  }

  findAll() {
    return `This action returns all profesorProfile`;
  }

  findOne(id: number) {
    return `This action returns a #${id} profesorProfile`;
  }

  update(id: number, updateProfesorProfileDto: UpdateProfesorProfileDto) {
    return `This action updates a #${id} profesorProfile`;
  }

  remove(id: number) {
    return `This action removes a #${id} profesorProfile`;
  }
}
