import { Injectable } from '@nestjs/common';
import { CreateTipoIncidenciaDto } from './dto/create-tipo_incidencia.dto';
import { UpdateTipoIncidenciaDto } from './dto/update-tipo_incidencia.dto';

@Injectable()
export class TipoIncidenciaService {
  create(createTipoIncidenciaDto: CreateTipoIncidenciaDto) {
    return 'This action adds a new tipoIncidencia';
  }

  findAll() {
    return `This action returns all tipoIncidencia`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tipoIncidencia`;
  }

  update(id: number, updateTipoIncidenciaDto: UpdateTipoIncidenciaDto) {
    return `This action updates a #${id} tipoIncidencia`;
  }

  remove(id: number) {
    return `This action removes a #${id} tipoIncidencia`;
  }
}
