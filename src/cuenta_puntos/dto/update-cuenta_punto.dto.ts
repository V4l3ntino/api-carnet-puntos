import { PartialType } from '@nestjs/mapped-types';
import { CreateCuentaPuntoDto } from './create-cuenta_punto.dto';

export class UpdateCuentaPuntoDto extends PartialType(CreateCuentaPuntoDto) {}
