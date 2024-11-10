import { Injectable } from '@nestjs/common';
import { CreateTablaDto } from './dto/create-tabla.dto';
import { UpdateTablaDto } from './dto/update-tabla.dto';

@Injectable()
export class TablasService {
  create(createTablaDto: CreateTablaDto) {
    return 'This action adds a new tabla';
  }

  findAll() {
    return `This action returns all tablas`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tabla`;
  }

  update(id: number, updateTablaDto: UpdateTablaDto) {
    return `This action updates a #${id} tabla`;
  }

  remove(id: number) {
    return `This action removes a #${id} tabla`;
  }
}
