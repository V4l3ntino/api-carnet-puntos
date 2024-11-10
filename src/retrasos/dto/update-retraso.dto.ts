import { PartialType } from '@nestjs/mapped-types';
import { CreateRetrasoDto } from './create-retraso.dto';

export class UpdateRetrasoDto extends PartialType(CreateRetrasoDto) {}
