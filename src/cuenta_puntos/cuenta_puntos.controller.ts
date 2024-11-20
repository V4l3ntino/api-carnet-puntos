import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, UnauthorizedException } from '@nestjs/common';
import { CuentaPuntosService } from './cuenta_puntos.service';
import { CreateCuentaPuntoDto } from './dto/create-cuenta_punto.dto';
import { UpdateCuentaPuntoDto } from './dto/update-cuenta_punto.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('cuenta-puntos')
export class CuentaPuntosController {
  constructor(private readonly cuentaPuntosService: CuentaPuntosService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Request() request, @Body() createCuentaPuntoDto: CreateCuentaPuntoDto) {
    console.log(request.user)
    if(request.user.permisos.read && request.user.permisos.write && request.user.permisos.insert && request.user.permisos.delete){
      throw new UnauthorizedException()
    }
    return this.cuentaPuntosService.create(createCuentaPuntoDto);
  }

  @Get()
  findAll() {
    return this.cuentaPuntosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cuentaPuntosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCuentaPuntoDto: UpdateCuentaPuntoDto) {
    return this.cuentaPuntosService.update(id, updateCuentaPuntoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cuentaPuntosService.remove(id);
  }
}
