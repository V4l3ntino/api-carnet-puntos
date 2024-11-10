import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CuentaPuntosService } from './cuenta_puntos.service';
import { CreateCuentaPuntoDto } from './dto/create-cuenta_punto.dto';
import { UpdateCuentaPuntoDto } from './dto/update-cuenta_punto.dto';

@Controller('cuenta-puntos')
export class CuentaPuntosController {
  constructor(private readonly cuentaPuntosService: CuentaPuntosService) {}

  @Post()
  create(@Body() createCuentaPuntoDto: CreateCuentaPuntoDto) {
    return this.cuentaPuntosService.create(createCuentaPuntoDto);
  }

  @Get()
  findAll() {
    return this.cuentaPuntosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentaPuntosService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentaPuntoDto: UpdateCuentaPuntoDto) {
    return this.cuentaPuntosService.update(+id, updateCuentaPuntoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentaPuntosService.remove(+id);
  }
}
