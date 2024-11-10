import { PartialType } from '@nestjs/mapped-types';
import { CreateAlumnoProfileDto } from './create-alumno_profile.dto';

export class UpdateAlumnoProfileDto extends PartialType(CreateAlumnoProfileDto) {}
