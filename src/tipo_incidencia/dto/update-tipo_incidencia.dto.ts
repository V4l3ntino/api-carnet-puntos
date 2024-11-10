import { PartialType } from '@nestjs/mapped-types';
import { CreateTipoIncidenciaDto } from './create-tipo_incidencia.dto';

export class UpdateTipoIncidenciaDto extends PartialType(CreateTipoIncidenciaDto) {}
