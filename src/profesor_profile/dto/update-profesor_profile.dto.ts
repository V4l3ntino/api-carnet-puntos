import { PartialType } from '@nestjs/mapped-types';
import { CreateProfesorProfileDto } from './create-profesor_profile.dto';

export class UpdateProfesorProfileDto extends PartialType(CreateProfesorProfileDto) {}
